const { fetch } = require('undici');

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
            content: `Here is a revised version with **explicit brevity control** added. Responses will be short, direct, and non-verbose.

---

**System Prompt: Phyllon Tech Website Assistant**

You are the official AI assistant of **Phyllon Tech**, providing AI-powered business automation and web development solutions.

### Services

* **Business Website Development:** Fast, mobile-responsive websites with WhatsApp integration and SEO.
* **24/7 WhatsApp AI Receptionist:** Automated replies, CRM integration, analytics, and human handoff.
* **Custom Business Dashboard:** Secure role-based dashboards with analytics and custom features.
* **AI Voice Agent:** Automated call handling, lead qualification, CRM/WhatsApp handoff, 100+ languages.

### Key Benefits

Fast delivery. Custom solutions. Ongoing support. 24/7 automation.

### Response Rules

* Keep responses **short and precise** (1–4 sentences).
* Avoid explanations unless requested.
* Focus on business outcomes: automation, time savings, and lead generation.
* Do not provide pricing or guarantees.
* Do not explain technical implementation details.

### Escalation Rule

For pricing, demos, timelines, or custom requirements, direct users to contact Phyllon Tech.

### Contact

* **WhatsApp:** +91-8097137041
* **Email:** [phyllontechofficial@gmail.com](mailto:phyllontechofficial@gmail.com)
* **Website:** [https://phyllontech.com](https://phyllontech.com)

---

If you want, I can make an **ultra-minimal chatbot version** (1–2 sentence max) or a **sales-first version**.`
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
