'use strict';

const fs = require('fs');
const path = require('path');

/**
 * DESIGN.md template system — 21 curated design system styles.
 */

const STYLES = {
  minimal: {
    name: 'Minimal',
    description: 'Clean, minimal design with restrained color palette',
    colors: { primary: '#1A1A1A', secondary: '#666666', tertiary: '#0066CC', neutral: '#FAFAFA' },
    accent: '#0066CC',
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary design with vibrant accents and crisp typography',
    colors: { primary: '#0F172A', secondary: '#475569', tertiary: '#3B82F6', neutral: '#F8FAFC' },
    accent: '#3B82F6',
  },
  corporate: {
    name: 'Corporate',
    description: 'Professional enterprise-grade design system',
    colors: { primary: '#1E293B', secondary: '#64748B', tertiary: '#2563EB', neutral: '#FFFFFF' },
    accent: '#2563EB',
  },
  brutalist: {
    name: 'Brutalist',
    description: 'Raw, bold, unapologetic brutalist design',
    colors: { primary: '#000000', secondary: '#333333', tertiary: '#FF4500', neutral: '#FFFFFF' },
    accent: '#FF4500',
  },
  dark: {
    name: 'Dark Mode',
    description: 'Atmospheric dark mode design system',
    colors: { primary: '#E2E8F0', secondary: '#94A3B8', tertiary: '#38BDF8', neutral: '#0F172A' },
    accent: '#38BDF8',
  },
  nature: {
    name: 'Nature',
    description: 'Organic, earthy design inspired by natural colors',
    colors: { primary: '#1A3C34', secondary: '#5C7A6A', tertiary: '#2ECC71', neutral: '#F5F1EB' },
    accent: '#2ECC71',
  },
  retro: {
    name: 'Retro',
    description: 'Vintage-inspired design with warm nostalgic tones',
    colors: { primary: '#2D1810', secondary: '#8B4513', tertiary: '#FF6B35', neutral: '#FFF8E7' },
    accent: '#FF6B35',
  },
  neon: {
    name: 'Neon',
    description: 'Electric neon design with cyberpunk aesthetics',
    colors: { primary: '#00FFCC', secondary: '#7700FF', tertiary: '#FF00FF', neutral: '#0A0A0A' },
    accent: '#FF00FF',
  },
  luxury: {
    name: 'Luxury',
    description: 'Premium luxury design with gold and dark tones',
    colors: { primary: '#1C1C1C', secondary: '#4A4A4A', tertiary: '#C9A84C', neutral: '#FAF8F5' },
    accent: '#C9A84C',
  },
  playful: {
    name: 'Playful',
    description: 'Fun, energetic design with bright colors',
    colors: { primary: '#2D1B69', secondary: '#6C63FF', tertiary: '#FF6584', neutral: '#FEF9EF' },
    accent: '#FF6584',
  },
  editorial: {
    name: 'Editorial',
    description: 'Publication-grade design with strong typographic hierarchy',
    colors: { primary: '#1A1C1E', secondary: '#6C7278', tertiary: '#B8422E', neutral: '#F7F5F2' },
    accent: '#B8422E',
  },
  saas: {
    name: 'SaaS',
    description: 'Modern SaaS product design with trusted blue accents',
    colors: { primary: '#0A2540', secondary: '#425466', tertiary: '#635BFF', neutral: '#F6F9FC' },
    accent: '#635BFF',
  },
  fintech: {
    name: 'Fintech',
    description: 'Financial technology design with trust and security signals',
    colors: { primary: '#0C1E32', secondary: '#3D5A80', tertiary: '#00A86B', neutral: '#F0F4F8' },
    accent: '#00A86B',
  },
  healthcare: {
    name: 'Healthcare',
    description: 'Medical and health-tech design with calming tones',
    colors: { primary: '#1B4332', secondary: '#40916C', tertiary: '#52B788', neutral: '#F0FAF4' },
    accent: '#52B788',
  },
  ecommerce: {
    name: 'E-Commerce',
    description: 'Conversion-optimized e-commerce design system',
    colors: { primary: '#1A1A2E', secondary: '#16213E', tertiary: '#E94560', neutral: '#F9F9F9' },
    accent: '#E94560',
  },
  gaming: {
    name: 'Gaming',
    description: 'Immersive gaming UI with dynamic gradients and effects',
    colors: { primary: '#0D0221', secondary: '#261447', tertiary: '#FF006E', neutral: '#1A1A2E' },
    accent: '#FF006E',
  },
  education: {
    name: 'Education',
    description: 'Accessible educational design with clear hierarchy',
    colors: { primary: '#1E3A5F', secondary: '#4A90D9', tertiary: '#F5A623', neutral: '#F7F9FC' },
    accent: '#F5A623',
  },
  'startup': {
    name: 'Startup',
    description: 'Bold startup design with gradients and modern aesthetics',
    colors: { primary: '#1E1B4B', secondary: '#4338CA', tertiary: '#F43F5E', neutral: '#FAFAFA' },
    accent: '#F43F5E',
  },
  'agency': {
    name: 'Agency',
    description: 'Creative agency design with expressive typography',
    colors: { primary: '#000000', secondary: '#333333', tertiary: '#FF3366', neutral: '#FFFFFF' },
    accent: '#FF3366',
  },
  'web3': {
    name: 'Web3 / Crypto',
    description: 'Decentralized web design with gradient accents and dark mode',
    colors: { primary: '#0B0F19', secondary: '#627EEA', tertiary: '#8C3AEC', neutral: '#131A2A' },
    accent: '#8C3AEC',
  },
  'accessibility-first': {
    name: 'Accessibility First',
    description: 'WCAG AAA-optimized design with high contrast and large targets',
    colors: { primary: '#000000', secondary: '#595959', tertiary: '#0055CC', neutral: '#FFFFFF' },
    accent: '#0055CC',
  },
};

/**
 * Initialize a new DESIGN.md file from a template style.
 * @param {string} name - Design system name
 * @param {string} style - Style key from STYLES
 * @returns {string} Generated DESIGN.md content
 */
function init(name, style = 'minimal') {
  const template = STYLES[style] || STYLES.minimal;
  const now = new Date().toISOString().split('T')[0];
  
  return `---
version: alpha
name: ${name}
description: ${template.description}
colors:
  primary: "${template.colors.primary}"
  secondary: "${template.colors.secondary}"
  tertiary: "${template.colors.tertiary}"
  neutral: "${template.colors.neutral}"
typography:
  h1:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 8px
  lg: 16px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 12px
  input:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 10px
  card:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
---

## Overview

${name} — ${template.description}. Created with **design-md-system** on ${now}.

This DESIGN.md file defines the complete visual identity for ${name}, providing
machine-readable design tokens and human-readable rationale for AI coding agents
and developer tools.

## Colors

- **Primary (${template.colors.primary}):** Main brand color for headlines,
  primary text, and key UI elements. This is the foundational color of the
  design system.
- **Secondary (${template.colors.secondary}):** Supporting color for body text,
  captions, and secondary UI elements. Provides visual hierarchy.
- **Tertiary / Accent (${template.colors.tertiary}):** The action color —
  buttons, links, highlights, and interactive elements. ${style === 'accessibility-first' ? 'Meets WCAG AAA contrast (7:1+) against white.' : 'Use sparingly for maximum impact.'}
- **Neutral (${template.colors.neutral}):** Background and surface color.
  Keeps the interface clean and content-focused.

## Typography

Inter is the primary typeface — a modern, highly-readable sans-serif optimized
for screens. ${style === 'editorial' ? 'Strong typographic hierarchy drives the reading experience.' : 'Clear hierarchy with generous spacing.'}

- **h1:** Bold headlines at 3rem with tight tracking for impact
- **h2:** Section headers at 2rem with moderate tracking
- **body-md:** Comfortable reading at 1rem with 1.6 line-height

## Components

- **button-primary:** The primary call-to-action. High contrast against the
  background. Always the most important action on the page.
- **button-secondary:** Outlined secondary action. Used for less critical
  actions that shouldn't compete with the primary CTA.
- **input:** Clean text input with visible borders and comfortable padding.
- **card:** Container for grouped content with subtle rounding and spacing.

## Do's and Don'ts

- ✅ Use token references (\`{colors.primary}\`) instead of hardcoded hex values
- ✅ Limit to one primary button per view to maintain clear hierarchy
- ✅ Maintain minimum 4.5:1 contrast ratio for all text (WCAG AA)
- ❌ Don't use tertiary color for large text blocks — reserve for accents
- ❌ Don't nest component variants — use sibling keys (button-primary-hover)
- ❌ Don't skip the markdown body — it provides essential context for AI agents
`;
}

/**
 * List all available template styles.
 * @returns {string} Formatted list of styles
 */
function listTemplates() {
  const lines = [];
  lines.push('Available design system templates:\n');
  for (const [key, style] of Object.entries(STYLES)) {
    lines.push(`  ${key.padEnd(22)} ${style.name.padEnd(22)} ${style.description}`);
  }
  lines.push(`\nUsage: design-md init <name> --style <style-key>`);
  lines.push(`Example: design-md init acme-corp --style dark`);
  return lines.join('\n');
}

/**
 * Generate a template without writing to a file.
 * @param {string} style - Style key
 * @returns {string} Generated DESIGN.md content
 */
function generateTemplate(style) {
  return init(STYLES[style] ? style : 'minimal', style);
}

module.exports = { init, listTemplates, generateTemplate, styles: STYLES };
