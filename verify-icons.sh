#!/bin/bash
# Verification script for Phyllon Tech website icon implementation

echo "Verifying website icon implementation..."

# Check if root favicon.ico exists
if [ -f "favicon.ico" ]; then
    echo "favicon.ico exists at root level"
else
    echo "favicon.ico missing at root level"
fi

# Check if browserconfig.xml exists
if [ -f "browserconfig.xml" ]; then
    echo "browserconfig.xml exists"
else
    echo "browserconfig.xml missing"
fi

# Check if manifest.json exists
if [ -f "manifest.json" ]; then
    echo "manifest.json exists"
else
    echo "manifest.json missing"
fi

# Check if index.html contains expected tags
if grep -q "rel=\"mask-icon\"" index.html; then
    echo "Safari mask-icon found"
else
    echo "Safari mask-icon missing"
fi

if grep -q "name=\"theme-color\"" index.html; then
    echo "theme-color meta tag found"
else
    echo "theme-color meta tag missing"
fi

if grep -q "name=\"msapplication-TileColor\"" index.html; then
    echo "MS application TileColor found"
else
    echo "MS application TileColor missing"
fi

if grep -q "property=\"og:image:width\"" index.html; then
    echo "Open Graph image dimensions found"
else
    echo "Open Graph image dimensions missing"
fi

echo ""
echo "Summary of changes made:"
echo "- Added favicon.ico at root level"
echo "- Enhanced manifest.json with multiple icon sizes"
echo "- Added Safari mask-icon support"
echo "- Added Android theme-color meta tag"
echo "- Enhanced Open Graph and Twitter Card tags"
echo "- Added Windows tile support with browserconfig.xml"
echo ""
echo "To test in Google Search Console:"
echo "1. Visit https://search.google.com/search-console"
echo "2. Add/verify your property: https://phyllon.tech"
echo "3. Use the URL Inspection tool to test your homepage"
echo "4. Use Rich Results Test: https://search.google.com/test/rich-results"
echo "5. Use Mobile-Friendly Test: https://search.google.com/test/mobile-friendly"
echo ""
echo "Additional recommendations:"
echo "- Submit a sitemap.xml to Google Search Console"
echo "- Monitor search performance in the Search Console regularly"
echo "- Consider adding structured data for your services/products"