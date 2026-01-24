const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

exports.handler = async (event) => {
  // Only allow POST requests for storing conversation data
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { timestamp, userMessage, aiResponse, sessionId, userAgent } = JSON.parse(event.body);
    
    // Extract real IP from request headers
    const ipAddress = event.headers['x-nf-client-connection-ip'] || 
                     event.headers['x-forwarded-for'] || 
                     event.headers['x-real-ip'] || 
                     'Unknown';
    
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
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
        !process.env.GOOGLE_PRIVATE_KEY || 
        !process.env.GOOGLE_SPREADSHEET_ID) {
      throw new Error('Missing required Google Sheets environment variables');
    }

    // Initialize Google Sheets connection with v5 API
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, serviceAccountAuth);

    // Load document info and worksheets
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Use the first sheet

    // Prepare row data
    const rowData = {
      Timestamp: timestamp || new Date().toISOString(),
      'User Message': userMessage,
      'AI Response': aiResponse,
      'Session ID': sessionId,
      'IP Address': ipAddress || 'Unknown',
      'User Agent': userAgent || 'Unknown'
    };

    // Add new row to sheet
    await sheet.addRow(rowData);

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