# Reusable Head Components Documentation

This documentation explains how to use the reusable head components in your HTML pages.

## Files

- `head-components.js` - Contains functions to generate common head elements
- `styles.css` - Contains custom CSS styles
- `tailwind-config.js` - Contains Tailwind CSS configuration
- `index.html` - Example implementation using the reusable components

## How to Use in Other Pages

To use the same head elements in other HTML pages:

### 1. Basic Setup

Include the following in the `<head>` section of your HTML page:

```html
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  
  <!-- Meta tags -->
  <meta name="robots" content="index, follow" />
  <title>Your Page Title</title>
  <meta name="description" content="Your page description" />
  <meta name="keywords" content="your, keywords, here" />
  <meta property="og:title" content="Your Page Title">
  <meta property="og:description" content="Your page description">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourdomain.com/page-url">
  <meta property="og:image" content="images/your-image.png">
  <meta property="og:image:width" content="1500">
  <meta property="og:image:height" content="1500">
  <meta property="og:image:type" content="image/png">
  <meta property="og:site_name" content="Your Site Name">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Your Page Title">
  <meta name="twitter:description" content="Your page description">
  <meta name="twitter:image" content="images/your-image.png">
  <meta name="twitter:image:alt" content="Your Image Alt Text">
  
  <!-- Favicon and App Icons -->
  <link rel="icon" href="images/favicon.ico" type="image/x-icon">
  <link rel="icon" href="images/favicon-16x16.png" type="image/png" sizes="16x16">
  <link rel="icon" href="images/favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="icon" href="images/favicon-192x192.png" type="image/png" sizes="192x192">
  <link rel="icon" href="images/favicon-512x512.png" type="image/png" sizes="512x512">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png" sizes="180x180">
  <link rel="manifest" href="manifest.json">
  <!-- Safari Mask Icon -->
  <link rel="mask-icon" href="images/your-logo.png" color="#your-color">
  <!-- Theme Color for Android -->
  <meta name="theme-color" content="#your-color">
  <!-- Windows Tile and Application Information -->
  <meta name="msapplication-TileColor" content="#your-color">
  <meta name="msapplication-TileImage" content="images/favicon-192x192.png">
  <meta name="msapplication-config" content="browserconfig.xml">
  
  <!-- Google Fonts and Icons -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <script src="tailwind-config.js"></script>
  
  <!-- Custom Styles -->
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="ai-assistant.css">
  
  <!-- Navigation and Footer Scripts -->
  <script src="navbar.js"></script>
  <script src="footer.js"></script>
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "YourSchemaType",
    "name": "Your Name",
    "description": "Your description",
    "url": "https://yourdomain.com",
    // ... rest of your structured data
  }
  </script>
</head>
```

### 2. Using head-components.js Functions

The `head-components.js` file provides functions to generate common head elements:

#### generateMetaTags(options)
Generates SEO and social media meta tags with customizable options:

```javascript
const metaTags = generateMetaTags({
  title: "Your Page Title",
  description: "Your page description",
  url: "https://yourdomain.com/page-url",
  image: "images/your-image.png"
});
```

#### generateFavicons()
Generates all favicon and app icon links.

#### generateFontLinks()
Generates Google Fonts and Material Icons links.

#### generateStructuredData(businessData)
Generates structured data (JSON-LD) with customizable business information.

#### generateCommonHeadElements(options)
Generates all common head elements with customizable options.

### 3. Customizing for Different Pages

For different pages, you can customize the meta tags and structured data:

```html
<!-- In your page-specific JavaScript -->
<script>
  // Generate customized meta tags for this page
  document.head.insertAdjacentHTML('afterbegin', generateMetaTags({
    title: "Services - Your Company Name",
    description: "Learn about our services...",
    url: "https://yourdomain.com/services",
    image: "images/services-preview.jpg"
  }));
</script>
```

## Benefits

- **Consistency**: Ensures all pages have the same basic head structure
- **Maintainability**: Changes to common elements only need to be made in one place
- **SEO**: Proper meta tags and structured data for better search engine visibility
- **Performance**: Organized resources for optimal loading
- **Scalability**: Easy to add new pages with consistent head elements