# Reusable Tailwind Configuration

This project implements a reusable Tailwind CSS configuration that can be shared across multiple HTML pages.

## Files

- `tailwind-config.js` - Contains the shared Tailwind configuration
- `index.html` - Example implementation using the shared configuration

## How to Use in Other Pages

To use the same Tailwind configuration in other HTML pages:

1. Make sure to include the Tailwind CDN script in the `<head>` section:
   ```html
   <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
   ```

2. Add the reference to the shared configuration file right after the CDN script:
   ```html
   <script src="tailwind-config.js"></script>
   ```

3. The configuration will automatically apply the following customizations:
   - Dark mode enabled with `class` strategy
   - Custom color palette (primary, accent, backgrounds)
   - Custom fonts (Inter for display, Noto Sans for body)
   - Custom border radius values

## Configuration Details

The `tailwind-config.js` file contains:

- **Colors**: Primary blue (#2d85cd), accent red (#e61c1a), and background colors
- **Fonts**: Inter for display elements, Noto Sans for body text
- **Border Radius**: Default, large, extra-large, and full values
- **Dark Mode**: Enabled with class strategy

## Benefits

- Single source of truth for Tailwind configuration
- Consistent styling across all pages
- Easy maintenance and updates
- Follows DRY principles