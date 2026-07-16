'use strict';

const fs = require('fs');
const { loadDesignMd } = require('./loader');

/**
 * Export DESIGN.md tokens to various formats.
 * Supported: tailwind, dtcg, css, json, markdown
 */

const FORMATS = ['tailwind', 'dtcg', 'css', 'json', 'markdown'];

/**
 * Export design tokens from a DESIGN.md file.
 * @param {string} filePath - Path to DESIGN.md
 * @param {string} format - Export format
 * @returns {string}
 */
function exportTokens(filePath, format) {
  const data = loadDesignMd(filePath);
  const fm = data.frontmatter;
  
  switch (format) {
    case 'tailwind': return exportTailwind(fm);
    case 'dtcg': return exportDTCG(fm);
    case 'css': return exportCSS(fm);
    case 'json': return JSON.stringify(fm, null, 2);
    case 'markdown': return data.raw;
    default:
      throw new Error(`Unknown format: ${format}. Supported: ${FORMATS.join(', ')}`);
  }
}

/**
 * Export to Tailwind CSS theme.
 */
function exportTailwind(fm) {
  const theme = { extend: {} };
  
  // Colors
  if (fm.colors) {
    theme.extend.colors = {};
    for (const [key, val] of Object.entries(fm.colors)) {
      theme.extend.colors[key] = val;
    }
  }
  
  // Typography
  if (fm.typography) {
    theme.extend.fontFamily = {};
    theme.extend.fontSize = {};
    theme.extend.fontWeight = {};
    theme.extend.lineHeight = {};
    theme.extend.letterSpacing = {};
    
    for (const [key, val] of Object.entries(fm.typography)) {
      if (typeof val === 'object') {
        if (val.fontFamily) theme.extend.fontFamily[key] = [val.fontFamily, 'sans-serif'];
        if (val.fontSize) theme.extend.fontSize[key] = val.fontSize;
        if (val.fontWeight) theme.extend.fontWeight[key] = String(val.fontWeight);
        if (val.lineHeight) theme.extend.lineHeight[key] = String(val.lineHeight);
        if (val.letterSpacing) theme.extend.letterSpacing[key] = val.letterSpacing;
      }
    }
  }
  
  // Border radius
  if (fm.rounded) {
    theme.extend.borderRadius = fm.rounded;
  }
  
  // Spacing
  if (fm.spacing) {
    theme.extend.spacing = fm.spacing;
  }
  
  return JSON.stringify({ theme }, null, 2);
}

/**
 * Export to W3C DTCG (Design Tokens Format).
 */
function exportDTCG(fm) {
  const tokens = {};
  
  if (fm.colors) {
    for (const [key, val] of Object.entries(fm.colors)) {
      tokens[`color-${key}`] = {
        $type: 'color',
        $value: val,
      };
    }
  }
  
  if (fm.typography) {
    for (const [key, val] of Object.entries(fm.typography)) {
      if (typeof val === 'object') {
        if (val.fontSize) {
          tokens[`fontSize-${key}`] = { $type: 'dimension', $value: val.fontSize };
        }
        if (val.fontWeight) {
          tokens[`fontWeight-${key}`] = { $type: 'number', $value: val.fontWeight };
        }
        if (val.fontFamily) {
          tokens[`fontFamily-${key}`] = { $type: 'fontFamily', $value: val.fontFamily };
        }
      }
    }
  }
  
  if (fm.rounded) {
    for (const [key, val] of Object.entries(fm.rounded)) {
      tokens[`borderRadius-${key}`] = { $type: 'dimension', $value: val };
    }
  }
  
  if (fm.spacing) {
    for (const [key, val] of Object.entries(fm.spacing)) {
      tokens[`spacing-${key}`] = { $type: 'dimension', $value: val };
    }
  }
  
  return JSON.stringify(tokens, null, 2);
}

/**
 * Export to CSS custom properties.
 */
function exportCSS(fm) {
  const lines = [':root {'];
  
  if (fm.colors) {
    for (const [key, val] of Object.entries(fm.colors)) {
      lines.push(`  --color-${toKebab(key)}: ${val};`);
    }
  }
  
  if (fm.typography) {
    for (const [key, val] of Object.entries(fm.typography)) {
      if (typeof val === 'object') {
        if (val.fontFamily) lines.push(`  --font-family-${toKebab(key)}: ${val.fontFamily};`);
        if (val.fontSize) lines.push(`  --font-size-${toKebab(key)}: ${val.fontSize};`);
        if (val.fontWeight) lines.push(`  --font-weight-${toKebab(key)}: ${val.fontWeight};`);
        if (val.lineHeight) lines.push(`  --line-height-${toKebab(key)}: ${val.lineHeight};`);
        if (val.letterSpacing) lines.push(`  --letter-spacing-${toKebab(key)}: ${val.letterSpacing};`);
      }
    }
  }
  
  if (fm.rounded) {
    for (const [key, val] of Object.entries(fm.rounded)) {
      lines.push(`  --radius-${toKebab(key)}: ${val};`);
    }
  }
  
  if (fm.spacing) {
    for (const [key, val] of Object.entries(fm.spacing)) {
      lines.push(`  --spacing-${toKebab(key)}: ${val};`);
    }
  }
  
  lines.push('}');
  return lines.join('\n') + '\n';
}

function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports = { exportTokens, formats: FORMATS };
