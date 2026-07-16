'use strict';

const fs = require('fs');
const { loadDesignMd } = require('./loader');

/**
 * Validate a DESIGN.md file against the Google spec.
 * Checks structure, token references, WCAG contrast, and best practices.
 */

const CANONICAL_ORDER = [
  'overview', 'colors', 'typography', 'layout',
  'elevation', 'shapes', 'components', 'dosdonts'
];

const SECTION_ALIASES = {
  'overview': 'Overview',
  'colors': 'Colors',
  'typography': 'Typography',
  'layout': 'Layout & Spacing',
  'elevation': 'Elevation & Depth',
  'shapes': 'Shapes',
  'components': 'Components',
  'dosdonts': "Do's and Don'ts",
};

const COMPONENT_PROPERTY_WHITELIST = [
  'backgroundColor', 'textColor', 'typography', 'rounded',
  'padding', 'size', 'height', 'width'
];

/**
 * Validate a DESIGN.md file.
 * @param {string} filePath - Path to DESIGN.md
 * @returns {{ valid: boolean, errors: string[], warnings: string[], info: string[], wcag: object|null }}
 */
function validate(filePath) {
  const errors = [];
  const warnings = [];
  const info = [];
  
  let data;
  try {
    data = loadDesignMd(filePath);
  } catch (err) {
    return { valid: false, errors: [err.message], warnings: [], info: [], wcag: null };
  }
  
  const fm = data.frontmatter;
  const sections = data.sections;
  
  // 1. Check version
  if (fm.version && fm.version !== 'alpha') {
    info.push(`Spec version is "${fm.version}" — current spec is "alpha"`);
  }
  
  // 2. Check required fields
  if (!fm.name) warnings.push('Missing "name" in frontmatter — recommended for identification');
  if (!fm.colors) errors.push('Missing "colors" in frontmatter — required');
  if (!fm.description) warnings.push('Missing "description" — recommended for agent context');
  
  // 3. Check color format
  if (fm.colors) {
    for (const [key, val] of Object.entries(fm.colors)) {
      if (typeof val === 'string' && !val.startsWith('#')) {
        errors.push(`Color "${key}" value "${val}" is not a hex color (must start with #)`);
      }
    }
  }
  
  // 4. Check section order
  const presentSections = [];
  for (const canonical of CANONICAL_ORDER) {
    if (sections[canonical]) presentSections.push(canonical);
  }
  
  // Check for unknown sections
  for (const key of Object.keys(sections)) {
    if (!CANONICAL_ORDER.includes(key)) {
      info.push(`Section "${key}" is non-canonical — preserved but not validated`);
    }
  }
  
  // 5. Check typography fields
  if (fm.typography) {
    const validTypoFields = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'fontFeature', 'fontVariation'];
    for (const [key, val] of Object.entries(fm.typography)) {
      if (typeof val === 'object') {
        for (const subKey of Object.keys(val)) {
          if (!validTypoFields.includes(subKey)) {
            warnings.push(`Typography "${key}" has unknown property "${subKey}"`);
          }
        }
      }
    }
  }
  
  // 6. Check component property whitelist
  if (fm.components) {
    for (const [compName, compProps] of Object.entries(fm.components)) {
      if (typeof compProps === 'object') {
        for (const prop of Object.keys(compProps)) {
          if (!COMPONENT_PROPERTY_WHITELIST.includes(prop)) {
            warnings.push(`Component "${compName}" has unknown property "${prop}" — whitelist: ${COMPONENT_PROPERTY_WHITELIST.join(', ')}`);
          }
        }
      }
    }
  }
  
  // 7. Check token references
  const tokenRefRegex = /\{([^}]+)\}/g;
  const bodyText = data.body;
  let refMatch;
  while ((refMatch = tokenRefRegex.exec(bodyText)) !== null) {
    const ref = refMatch[1];
    const parts = ref.split('.');
    let current = fm;
    let valid = true;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        valid = false;
        break;
      }
    }
    if (!valid) {
      errors.push(`Broken token reference: "{${ref}}" — target not found`);
    }
  }
  
  // 8. WCAG contrast check (simplified)
  const wcagResults = checkWCAG(fm);
  
  const valid = errors.length === 0;
  
  return { valid, errors, warnings, info, wcag: wcagResults };
}

/**
 * Simplified WCAG contrast checking.
 */
function checkWCAG(fm) {
  if (!fm.components) return null;
  
  let aaTotal = 0, aaPasses = 0;
  const failures = [];
  
  for (const [name, props] of Object.entries(fm.components)) {
    if (typeof props !== 'object') continue;
    if (props.backgroundColor && props.textColor) {
      aaTotal++;
      const bg = resolveColor(props.backgroundColor, fm);
      const fg = resolveColor(props.textColor, fm);
      if (bg && fg) {
        const ratio = contrastRatio(bg, fg);
        if (ratio >= 4.5) {
          aaPasses++;
        } else {
          failures.push(`${name}: contrast ratio ${ratio.toFixed(2)} (needs ≥4.5 for WCAG AA)`);
        }
      }
    }
  }
  
  return { aaTotal, aaPasses, aaFailures: aaTotal - aaPasses, failures };
}

function resolveColor(value, fm) {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const ref = value.slice(1, -1);
    const parts = ref.split('.');
    let current = fm;
    for (const part of parts) {
      if (current && typeof current === 'object') current = current[part];
      else return null;
    }
    return typeof current === 'string' ? current : null;
  }
  return typeof value === 'string' ? value : null;
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

function relativeLuminance(hex) {
  if (!hex || !hex.startsWith('#')) return 0;
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Diff two DESIGN.md files.
 */
function diff(pathA, pathB) {
  const dataA = loadDesignMd(pathA);
  const dataB = loadDesignMd(pathB);
  
  const changes = [];
  let hasRegressions = false;
  
  // Compare colors
  if (dataA.frontmatter.colors && dataB.frontmatter.colors) {
    const allKeys = new Set([
      ...Object.keys(dataA.frontmatter.colors),
      ...Object.keys(dataB.frontmatter.colors),
    ]);
    for (const key of allKeys) {
      const a = dataA.frontmatter.colors[key];
      const b = dataB.frontmatter.colors[key];
      if (a === undefined) changes.push(`- Color "${key}" was removed`);
      else if (b === undefined) changes.push(`+ Color "${key}" was added: ${a}`);
      else if (a !== b) {
        changes.push(`~ Color "${key}" changed: ${b} → ${a}`);
        hasRegressions = true;
      }
    }
  }
  
  // Compare typography
  const typoA = dataA.frontmatter.typography || {};
  const typoB = dataB.frontmatter.typography || {};
  const typoKeys = new Set([...Object.keys(typoA), ...Object.keys(typoB)]);
  for (const key of typoKeys) {
    const a = JSON.stringify(typoA[key]);
    const b = JSON.stringify(typoB[key]);
    if (a !== b) {
      changes.push(`~ Typography "${key}" changed`);
      hasRegressions = true;
    }
  }
  
  // Compare components
  const compA = dataA.frontmatter.components || {};
  const compB = dataB.frontmatter.components || {};
  const compKeys = new Set([...Object.keys(compA), ...Object.keys(compB)]);
  for (const key of compKeys) {
    const a = JSON.stringify(compA[key]);
    const b = JSON.stringify(compB[key]);
    if (a === undefined) changes.push(`- Component "${key}" was removed`);
    else if (b === undefined) changes.push(`+ Component "${key}" was added`);
    else if (a !== b) {
      changes.push(`~ Component "${key}" changed`);
      hasRegressions = true;
    }
  }
  
  if (changes.length === 0) {
    return '✅ No changes detected between the two files.\n';
  }
  
  return changes.join('\n') + '\n\n' + 
    (hasRegressions ? '⚠️  Regressions detected!' : 'ℹ️  Additions only, no regressions.') + '\n';
}

module.exports = { validate, diff, contrastRatio, hexToRgb };
