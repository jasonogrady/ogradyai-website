# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Jason O'Grady (ogrady.ai) - a static site showcasing writing, publications, and professional experience. Built with vanilla HTML/CSS/JavaScript using Parcel bundler.

## Development Commands

```bash
# Start development server (opens in browser)
npm run dev

# Build for production
npm run build

# Build and serve (runs build then dev)
npm start
```

## Architecture

### Page Structure

The site is a multi-page static website with the following pages:
- `index.html` - Home page with personal intro
- `contact.html` - Contact information and social links
- `publications.html` - Published works and books
- `resume.html` - Professional resume/CV
- `404.html` - Custom error page

### Styling System

CSS is organized into modular files:
- `normalize.css` - CSS reset
- `boilerplate.css` - HTML5 Boilerplate base styles
- `main.css` - Primary styles with CSS custom properties for theming
- `menu-style.css` - Animated hamburger menu navigation
- `dark-mode.css` - Dark mode support via `prefers-color-scheme` media query

**Color Scheme (CSS Custom Properties):**
- `--main`: Primary text/UI color (#1A2966 light, #eee dark)
- `--alt`: Accent color (#DC554F, consistent across themes)
- `--highlight`: Secondary accent (#14bec3 light, #00f9ff dark)
- `--background`: Background color (#eee light, #171f40 dark)

Dark mode automatically activates based on system preferences - no JavaScript toggle needed.

### JavaScript

Minimal JavaScript approach:
- `menu.js` - Handles mobile hamburger menu toggle (adds/removes 'active' class)
- `plugins.js` - Console polyfill for older browsers
- `main.js` - Not currently present (referenced but not implemented)
- jQuery included but not actively used

### Navigation

Custom animated hamburger menu that:
- Shows hamburger icon on mobile (<600px)
- Expands to full horizontal menu on desktop (≥600px)
- Uses CSS transitions for smooth animations
- Active page indicated by red accent color on nav item

### Analytics

Google Analytics 4 (GA4) is implemented with tracking ID `G-WSXFNKGXG1` via gtag.js.

## Key Implementation Details

**Responsive Typography:** Uses CSS `clamp()` for fluid typography that scales with viewport width.

**Emoji Images:** Custom emoji PNG files in `/img` directory are used instead of native emoji for consistent cross-platform rendering.

**Social Icons:** Social media links use SVG icons with color and hover state variants (regular, hover, and white versions for dark mode).

**Font Stack:**
- Headings/body: 'Bree Serif' (serif)
- Subtext annotations: 'Dancing Script' (cursive)
- General text: 'Rubik' (sans-serif, weight 300)

## File Locations

- HTML pages: Root directory
- Stylesheets: `/css/`
- JavaScript: `/js/`
- Images/emojis: `/img/`
- Favicons/PWA assets: `/favicon/`
- Social media icons: `/img/` (SVG format with variants)

## Browser Support

Uses Modernizr for feature detection. Parcel bundler handles transpilation and polyfills.
