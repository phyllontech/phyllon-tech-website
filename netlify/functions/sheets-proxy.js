const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

exports.handler = async (event) => {
  console.log('Function started. Method:', event.httpMethod);
  console.log('Headers:', JSON.stringify(event.headers, null, 2));
  
  // Only allow POST requests for storing conversation data
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    console.log('Parsing request body...');
    const { timestamp, userMessage, aiResponse, sessionId, userAgent } = JSON.parse(event.body);
    console.log('Parsed body:', { timestamp, userMessage: userMessage?.substring(0, 50), hasAiResponse: !!aiResponse, sessionId, userAgent: userAgent?.substring(0, 50) });
    
    // Extract real IP from request headers
    console.log('Extracting IP address...');
    const xnfIp = event.headers['x-nf-client-connection-ip'];
    const forwardedFor = event.headers['x-forwarded-for'];
    const realIp = event.headers['x-real-ip'];
    
    console.log('IP Headers:', { xnfIp, forwardedFor, realIp });
    
    const ipAddress = xnfIp || forwardedFor || realIp || 'Unknown';
    console.log('Final IP:', ipAddress);
    
    // Validate required fields
    if (!userMessage || !aiResponse || !sessionId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Missing required fields: userMessage, aiResponse, sessionId' })
      };
    }

    // Environment variables validation
    console.log('Checking environment variables...');
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SPREADSHEET_ID;
    
    console.log('Environment check:', {
      hasEmail: !!email,
      emailLength: email?.length,
      hasPrivateKey: !!privateKey,
      privateKeyLength: privateKey?.length,
      privateKeyStart: privateKey?.substring(0, 50),
      hasSheetId: !!sheetId,
      sheetIdLength: sheetId?.length
    });

    if (!email || !privateKey || !sheetId) {
      throw new Error('Missing required Google Sheets environment variables');
    }

    console.log('Creating JWT auth...');
    // Initialize Google Sheets connection with v5 API
    const serviceAccountAuth = new JWT({
      email: email,
      key: privateKey.replace(/\\n/g, '\n').replace(/\\\\n/g, '\\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('Creating GoogleSpreadsheet instance...');
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

    // Load document info and worksheets
    console.log('Loading document info...');
    await doc.loadInfo();
    console.log('Document loaded. Sheet count:', doc.sheetCount);
    
    const sheet = doc.sheetsByIndex[0]; // Use the first sheet
    console.log('Using sheet:', sheet.title, 'Row count:', sheet.rowCount);

    // Prepare row data
    const rowData = {
      Timestamp: timestamp || new Date().toISOString(),
      'User Message': userMessage,
      'AI Response': aiResponse,
      'Session ID': sessionId,
      'IP Address': ipAddress || 'Unknown',
      'User Agent': userAgent || 'Unknown'
    };
    
    console.log('Adding row with data:', { ...rowData, 'User Message': rowData['User Message']?.substring(0, 50), 'AI Response': rowData['AI Response']?.substring(0, 50) });

    // Add new row to sheet
    console.log('Calling addRow...');
    await sheet.addRow(rowData);
    console.log('Row added successfully!');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Conversation data stored successfully',
        timestamp: rowData.Timestamp
      })
    };

  } catch (error) {
    console.error('Google Sheets Function Error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        error: 'Failed to store conversation data',
        details: error.message 
      })
    };
  }
};