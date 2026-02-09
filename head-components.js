/**
 * Reusable Head Components for HTML Pages
 * 
 * This file contains functions to generate common head elements that can be reused across multiple HTML pages.
 * It includes functions for generating favicons, SEO meta tags, social media meta tags, 
 * font and icon links, structured data, and custom styles.
 */

/**
 * Generates favicon and app icon links
 * @returns {string} HTML string containing all favicon and app icon links
 */
function generateFavicons() {
  return `
  <!-- Favicon and App Icons -->
  <link rel="icon" href="images/favicon.ico" type="image/x-icon">
  <link rel="icon" href="images/favicon-16x16.png" type="image/png" sizes="16x16">
  <link rel="icon" href="images/favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="icon" href="images/favicon-192x192.png" type="image/png" sizes="192x192">
  <link rel="icon" href="images/favicon-512x512.png" type="image/png" sizes="512x512">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png" sizes="180x180">
  <link rel="manifest" href="manifest.json">
  <!-- Safari Mask Icon -->
  <link rel="mask-icon" href="images/phyllon_logo_192x192.png" color="#2d85cd">
  <!-- Theme Color for Android -->
  <meta name="theme-color" content="#2d85cd">
  <!-- Windows Tile and Application Information -->
  <meta name="msapplication-TileColor" content="#2d85cd">
  <meta name="msapplication-TileImage" content="images/favicon-192x192.png">
  <meta name="msapplication-config" content="browserconfig.xml">`;
}

/**
 * Generates SEO and social media meta tags
 * @param {Object} options - Options for meta tags
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.url - Page URL
 * @param {string} options.image - Image URL for social media
 * @returns {string} HTML string containing SEO and social media meta tags
 */
function generateMetaTags(options = {}) {
  const defaults = {
    title: "Phyllon Tech - Digital Solutions for Modern Businesses",
    description: "Phyllon Tech helps businesses grow with professional websites, automation tools, and custom digital solutions.",
    keywords: "WhatsApp AI chatbot, AI voice agent, business website development, custom dashboard, lead generation, business automation, AI receptionist, 24/7 customer support",
    url: "https://phyllon.tech",
    image: "images/phyllon_logo_1500x1500.png"
  };
  
  const opts = {...defaults, ...options};
  
  return `
  <meta name="robots" content="index, follow" />
  <title>${opts.title}</title>
  <meta name="description" content="${opts.description}" />
  <meta name="keywords" content="${opts.keywords}" />
  <meta property="og:title" content="${opts.title}">
  <meta property="og:description" content="${opts.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${opts.url}">
  <meta property="og:image" content="${opts.image}">
  <meta property="og:image:width" content="1500">
  <meta property="og:image:height" content="1500">
  <meta property="og:image:type" content="image/png">
  <meta property="og:site_name" content="Phyllon Tech">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${opts.title}">
  <meta name="twitter:description" content="${opts.description}">
  <meta name="twitter:image" content="${opts.image}">
  <meta name="twitter:image:alt" content="Phyllon Tech Logo">`;
}

/**
 * Generates Google Fonts and Material Icons links
 * @returns {string} HTML string containing font and icon links
 */
function generateFontLinks() {
  return `
  <!-- Google Fonts Material Icons -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&amp;family=Noto+Sans:wght@400;500;700;900&amp;display=swap"
    rel="stylesheet" />`;
}

/**
 * Generates structured data (JSON-LD)
 * @param {Object} businessData - Business information for structured data
 * @returns {string} HTML string containing structured data script tag
 */
function generateStructuredData(businessData = {}) {
  const defaultData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Phyllon Tech",
    "alternateName": "Phyllon Tech - Digital Solutions for Modern Businesses",
    "description": "AI-powered business automation company offering website development, WhatsApp AI receptionists, custom dashboards, and voice agents.",
    "url": "https://phyllon.tech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://phyllon.tech/images/phyllon_logo_1500x1500.png",
      "width": 1500,
      "height": 1500
    },
    "image": "https://phyllon.tech/images/phyllon_logo_1500x1500.png",
    "foundingDate": "2026",
    "areaServed": [
      {
        "@type": "City",
        "name": "Mumbai"
      },
      {
        "@type": "State",
        "name": "Maharashtra"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Phyllon Tech Team",
      "jobTitle": "Digital Solutions Experts",
      "knowsAbout": [
        "AI Development",
        "Web Development",
        "Business Automation",
        "Customer Experience"
      ]
    },
    "serviceType": [
      "Website Development",
      "AI Chatbot Development",
      "Business Automation",
      "Custom Dashboard Creation",
      "Voice Agent Development"
    ],
    "providerType": "Business",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8097137041",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "email": "info@phyllon.tech",
    "knowsAbout": [
      "AI Chatbots",
      "Business Automation",
      "Web Development",
      "WhatsApp Integration",
      "Voice Agents",
      "Custom Dashboards",
      "Lead Generation",
      "24/7 Customer Support"
    ],
    "sameAs": [
      "https://www.instagram.com/phyllon.tech.official/",
      "https://phyllon.tech"
    ],
    "offers": {
      "@type": "OfferCatalog",
      "name": "Digital Business Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Website Development",
            "description": "Professional websites designed to grow your business with responsive layouts and SEO optimization."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "WhatsApp AI Receptionist",
            "description": "Automated WhatsApp chatbot that handles customer inquiries 24/7, qualifying leads and providing instant responses."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Business Dashboard",
            "description": "Tailored dashboards to visualize your business metrics, automate reporting, and streamline operations."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Voice Agent",
            "description": "Intelligent voice assistants that handle phone calls, schedule appointments, and provide customer support."
          }
        }
      ]
    }
  };

  const data = {...defaultData, ...businessData};
  
  return `
  <script type="application/ld+json">
  ${JSON.stringify(data, null, 2)}
  </script>`;
}

/**
 * Generates all common head elements
 * @param {Object} options - Options for generating head elements
 * @returns {string} HTML string containing all common head elements
 */
function generateCommonHeadElements(options = {}) {
  return `
${generateMetaTags(options.meta || {})}
${generateFavicons()}
${generateFontLinks()}
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="ai-assistant.css">
${generateStructuredData(options.schema || {})}`;
}

/**
 * Injects head elements into the current document
 * @param {Object} options - Options for generating head elements
 */
function injectHeadElements(options = {}) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const headHTML = generateCommonHeadElements(options);

  // Create a temporary element to parse the HTML string
  const temp = document.createElement('div');
  temp.innerHTML = headHTML;

  // Append each child element to the head
  while(temp.firstChild) {
    head.appendChild(temp.firstChild);
  }
}