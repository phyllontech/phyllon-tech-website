exports.handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const bundles = [
      {
        "name": "Starter Bundle",
        "originalPrice": 4000,
        "salePrice": 3500,
        "features": ["Website", "WhatsApp Chatbot (3 mo)"]
      },
      {
        "name": "Growth Bundle",
        "originalPrice": 5000,
        "salePrice": 4300,
        "features": ["Website", "WhatsApp Chatbot (6 mo)"]
      },
      {
        "name": "Business Bundle",
        "originalPrice": 10000,
        "salePrice": 8000,
        "popular": true,
        "features": ["Website", "WhatsApp Chatbot (6 mo)", "Business Dashboard"]
      },
      {
        "name": "Automation Pro Bundle",
        "originalPrice": 13000,
        "salePrice": 10000,
        "features": ["Website", "WhatsApp Chatbot (12 mo)", "Business Dashboard"]
      }
    ];

    // Dynamically calculate saveAmount for each bundle
    const bundlesWithSavings = bundles.map(bundle => ({
      ...bundle,
      saveAmount: bundle.originalPrice - bundle.salePrice
    }));

    const pricingData = {
      "individualServices": [
        {
          "name": "Website",
          "price": 2000,
          "description": "Single-page responsive website",
          "fullDescription": "Fast, mobile-responsive websites with WhatsApp integration and SEO"
        },
        {
          "name": "WhatsApp Chatbot",
          "pricing": [
            { "duration": "3 mo", "price": 2000 },
            { "duration": "6 mo", "price": 3000 }
          ],
          "description": "24/7 automated customer interaction",
          "fullDescription": "Automated replies, CRM integration, analytics, and human handoff"
        },
        {
          "name": "Business Dashboard",
          "price": 5000,
          "description": "Centralized data and operations",
          "fullDescription": "Secure role-based dashboards with analytics and custom features"
        },
        {
          "name": "AI Voice Agent",
          "price": "Contact Us",
          "description": "Automated inbound call handling",
          "fullDescription": "Automated call handling, lead qualification, CRM/WhatsApp handoff, 100+ languages"
        }
      ],
      "bundles": bundlesWithSavings
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(pricingData)
    };
  } catch (error) {
    console.error('Pricing function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};