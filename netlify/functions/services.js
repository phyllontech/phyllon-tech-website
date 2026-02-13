exports.handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const servicesData = {
      "services": [
        {
          "icon": "web",
          "title": "Web Applications",
          "description": "Custom-built systems designed around your exact business model.",
          "features": [
            "Fully tailored dashboards built around your workflow",
            "Replace messy Excel sheets with structured systems",
            "Real-time visibility into operations and performance",
            "Secure access with role-based permissions"
          ],
          "outcome": "Outcome: A centralized web platform tailored to your operations"
        },
        {
          "icon": "phone_iphone",
          "title": "Mobile Applications",
          "description": "Mobile apps that keep your business connected anywhere.",
          "features": [
            "Customer-facing apps that improve engagement and retention",
            "Field staff apps for faster on-ground execution",
            "Cross-platform apps (Android + iOS) from a single codebase",
            "Seamless backend integration for real-time data sync"
          ],
          "outcome": "Outcome: Mobile solutions that extend your business reach"
        },
        {
          "icon": "smart_toy",
          "title": "AI Automation",
          "description": "Intelligent systems that work 24/7 without human intervention.",
          "features": [
            "WhatsApp AI chatbots for instant customer responses",
            "Voice AI agents for inbound call handling",
            "Lead qualification and CRM integration",
            "Multi-language support for global reach"
          ],
          "outcome": "Outcome: Automated lead-capturing processes reducing workload"
        },
        {
          "icon": "cloud_sync",
          "title": "System Integration",
          "description": "Connect your existing tools for seamless operations.",
          "features": [
            "API integrations between different platforms",
            "Automated data sync across systems",
            "Custom middleware development",
            "Legacy system modernization"
          ],
          "outcome": "Outcome: Connected systems that eliminate manual work and data silos"
        },
        {
          "icon": "api",
          "title": "API Development",
          "description": "Strong backend foundations that connect everything together.",
          "features": [
            "Scalable backend architecture built for growth",
            "Smooth third-party integrations (payments, SMS, WhatsApp)",
            "Secure data exchange between platforms",
            "Future-ready infrastructure for new features"
          ],
          "outcome": "Outcome: A reliable backend that powers all your digital systems"
        },
        {
          "icon": "settings_suggest",
          "title": "Automation & Workflow Systems",
          "description": "Turn repetitive manual work into automated workflows.",
          "features": [
            "Eliminate repetitive tasks and manual reporting",
            "Transform Excel-based processes into live dashboards",
            "Automated emails, reports, and notifications",
            "Faster processes with fewer human errors"
          ],
          "outcome": "Outcome: Reduced manual work and improved operational efficiency"
        },
        {
          "icon": "cloud",
          "title": "SaaS Products (Built for a Client)",
          "description": "Launch your own scalable software product.",
          "features": [
            "White-label SaaS platforms built under your brand",
            "Subscription-ready systems with payment integration",
            "Multi-tenant architecture for serving multiple clients",
            "Built to scale from first 10 users to 10,000+"
          ],
          "outcome": "Outcome: A scalable SaaS product built for recurring revenue"
        },
        {
          "icon": "shopping_cart",
          "title": "E-commerce Customization",
          "description": "Advanced customizations beyond basic store setups.",
          "features": [
            "Custom Shopify apps tailored to your store logic",
            "Optimized checkout flows to increase conversions",
            "Inventory sync across multiple platforms",
            "Marketplace and multi-vendor system development"
          ],
          "outcome": "Outcome: A high-performing e-commerce system built to maximize sales"
        },
        {
          "icon": "update",
          "title": "Legacy System Modernization",
          "description": "Upgrade outdated systems without disrupting business.",
          "features": [
            "Modernize old PHP or legacy systems to scalable frameworks",
            "Migrate from on-premise servers to secure cloud",
            "Improve speed, security, and reliability",
            "Restructure databases for better performance"
          ],
          "outcome": "Outcome: A modern, secure system ready for long-term growth"
        },
        {
          "icon": "build",
          "title": "Maintenance & Support",
          "description": "Continuous improvement and technical peace of mind.",
          "features": [
            "Fast bug fixes and proactive issue resolution",
            "Performance tuning for smoother user experience",
            "Security monitoring and hardening",
            "Ongoing feature upgrades as your business evolves"
          ],
          "outcome": "Outcome: Stable systems that grow with your business"
        }
      ]
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(servicesData)
    };
  } catch (error) {
    console.error('Services function error:', error);
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