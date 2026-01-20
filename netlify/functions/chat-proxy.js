const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);
    
    const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPINFRA_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.MODEL || 'meta-llama/Meta-Llama-3-8B-Instruct',
        messages: [
          {
            role: 'system',
            content: 'You are Phyllon Tech\'s AI assistant. Phyllon Tech provides AI-powered business automation and web development services.\n\nOur services include:\n1. Business Website Development - Clean, fast, mobile-responsive websites with contact forms, WhatsApp integration, and SEO optimization\n2. 24/7 WhatsApp AI Receptionist - Automated customer responses, CRM integration, conversation analytics, and seamless human handoff\n3. Custom Business Dashboard - Secure role-based access, data management panels, analytics, and custom features\n4. AI Voice Agent - Automated call handling, lead qualification, CRM/WhatsApp handoff, 100+ languages supported\n\nContact: WhatsApp +91-8097137041, Email: phyllontechofficial@gmail.com\nWebsite: phyllontech.com\n\nBenefits: Fast delivery, ongoing support, custom solutions, 24/7 automation\nBe professional yet approachable. Focus on how our solutions help businesses grow and save time. For pricing or specific implementation details, direct customers to contact us via WhatsApp or email.'
          },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ content: data.choices[0].message.content })
    };
  } catch (error) {
    console.error('Function error:', error);
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