const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { timestamp, userMessage, aiResponse, sessionId, userAgent } = JSON.parse(event.body);
    
    const xnfIp = event.headers['x-nf-client-connection-ip'];
    const forwardedFor = event.headers['x-forwarded-for'];
    const realIp = event.headers['x-real-ip'];
    const ipAddress = xnfIp || forwardedFor || realIp || 'Unknown';
    
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

    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!email || !privateKey || !sheetId) {
      throw new Error('Missing required Google Sheets environment variables');
    }

    const doc = new GoogleSpreadsheet(sheetId);
    
    await doc.useServiceAccountAuth({
        client_email: email,
        private_key: privateKey.replace(/\\n/g, '\n').replace(/\\\\n/g, '\\n'),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const rowData = {
      Timestamp: timestamp || new Date().toISOString(),
      'User Message': userMessage,
      'AI Response': aiResponse,
      'Session ID': sessionId,
      'IP Address': ipAddress,
      'User Agent': userAgent || 'Unknown'
    };

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
    console.error('Google Sheets Function Error:', error.message);
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