const { fetch } = require('undici');
const { readFile } = require('fs').promises;

async function getPricingData() {
  try {
    const data = await readFile('./pricing-data.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading pricing data:', error);
    return null;
  }
}

function generatePricingPrompt(pricingData) {
  if (!pricingData) {
    return "Pricing information currently unavailable. Please contact Phyllon Tech directly for current pricing.";
  }

  let prompt = "**Services & Pricing**\n\n";
  
  prompt += "**Individual Services:**\n";
  pricingData.individualServices.forEach(service => {
    if (service.pricing) {
      // WhatsApp Chatbot with multiple pricing tiers
      prompt += `* **${service.name}:** `;
      service.pricing.forEach((tier, index) => {
        if (index > 0) prompt += " or ";
        prompt += `₹${tier.price}/${tier.duration}`;
      });
      prompt += ` - ${service.fullDescription}.\n`;
    } else if (typeof service.price === 'number') {
      prompt += `* **${service.name}:** ₹${service.price.toLocaleString()} - ${service.fullDescription}.\n`;
    } else {
      prompt += `* **${service.name}:** ${service.price} - ${service.fullDescription}.\n`;
    }
  });

  prompt += "\n**Bundle Packages (Save More):**\n";
  pricingData.bundles.forEach(bundle => {
    const popularBadge = bundle.popular ? " (Most Popular)" : "";
    prompt += `* **${bundle.name}:** ₹${bundle.salePrice.toLocaleString()} (Save ₹${bundle.saveAmount.toLocaleString()})${popularBadge} - `;
    prompt += bundle.features.join(" + ");
    prompt += ".\n";
  });

  return prompt;
}

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);
    const pricingData = await getPricingData();
    
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
            content: `**System Prompt: Phyllon Tech Website Assistant**

You are the official AI assistant of **Phyllon Tech**, providing AI-powered business automation and web development solutions.

${generatePricingPrompt(pricingData)}

### Key Benefits

Fast delivery. Custom solutions. Ongoing support. 24/7 automation.

### Response Rules

* Keep responses **short and precise** (1–4 sentences).
* Provide pricing information when asked about specific services.
* Focus on business outcomes: automation, time savings, and lead generation.
* Do not provide guarantees or explain technical implementation details.

### Escalation Rule

For demos, custom requirements, or AI Voice Agent pricing, direct users to contact Phyllon Tech.

### Contact

* **WhatsApp:** +91-8097137041
* **Email:** [info@phyllon.tech](mailto:info@phyllon.tech)
* **Website:** [https://phyllon.tech](https://phyllon.tech)`
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
