'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Load and parse DESIGN.md files, handling YAML frontmatter and markdown body.
 */

const SPEC_REFERENCE = `
# DESIGN.md Specification Reference (Alpha)

## Canonical Section Order
1. Overview (alias: Brand & Style)
2. Colors
3. Typography
4. Layout (alias: Layout & Spacing)
5. Elevation & Depth (alias: Elevation)
6. Shapes
7. Components
8. Do's and Don'ts

## Token Types
| Type        | Format                  | Example            |
|-------------|-------------------------|--------------------|
| Color       | # + hex (sRGB)          | "#1A1C1E"          |
| Dimension   | number + unit           | "48px", "-0.02em"  |
| Reference   | {path.to.token}         | "{colors.primary}" |
| Typography  | object                  | see spec           |

## Component Property Whitelist
backgroundColor, textColor, typography, rounded, padding, size, height, width

## Rules
- YAML frontmatter uses --- delimiters
- Colors must be quoted hex strings
- Component variants use sibling keys (button-primary-hover), not nesting
- Negative dimensions need quotes: "-0.02em"
- version: alpha is current spec version
`;

/**
 * Load a DESIGN.md file and parse its frontmatter.
 * @param {string} filePath - Path to DESIGN.md file
 * @returns {{ raw: string, frontmatter: object, body: string, sections: object }}
 */
function loadDesignMd(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = parseFrontmatter(raw);
  
  // Extract sections
  const sections = {};
  const sectionRegex = /^## (.+)$/gm;
  let match;
  const sectionStarts = [];
  while ((match = sectionRegex.exec(parsed.body)) !== null) {
    sectionStarts.push({ title: match[1].trim(), index: match.index, offset: match[0].length });
  }
  
  for (let i = 0; i < sectionStarts.length; i++) {
    const current = sectionStarts[i];
    const next = sectionStarts[i + 1];
    const contentStart = current.index + current.offset;
    const contentEnd = next ? next.index : parsed.body.length;
    const normalized = normalizeSectionName(current.title);
    sections[normalized] = parsed.body.slice(contentStart, contentEnd).trim();
  }
  
  return { raw, frontmatter: parsed.frontmatter, body: parsed.body, sections };
}

/**
 * Parse YAML frontmatter and markdown body from raw content.
 * @param {string} raw - Raw file content
 * @returns {{ frontmatter: object, body: string }}
 */
function parseFrontmatter(raw) {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('---')) {
    return { frontmatter: {}, body: trimmed };
  }
  
  const endIdx = trimmed.indexOf('---', 3);
  if (endIdx === -1) {
    return { frontmatter: {}, body: trimmed };
  }
  
  const yamlStr = trimmed.slice(3, endIdx).trim();
  const body = trimmed.slice(endIdx + 3).trim();
  
  const frontmatter = parseSimpleYaml(yamlStr);
  
  return { frontmatter, body };
}

/**
 * Parse a subset of YAML (enough for DESIGN.md frontmatter).
 * @param {string} yaml - YAML string
 * @returns {object}
 */
function parseSimpleYaml(yaml) {
  const result = {};
  const lines = yaml.split('\n');
  let currentObj = result;
  let currentPath = [];
  const stack = [{ obj: result, indent: -1 }];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;
    
    const indent = line.search(/\S/);
    const trimmed = line.trim();
    
    // Pop stack for dedent
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }
    currentObj = stack[stack.length - 1].obj;
    
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    
    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();
    
    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    if (value === '' || value === '{}') {
      // Object start
      const newObj = {};
      currentObj[key] = newObj;
      stack.push({ obj: newObj, indent });
    } else {
      // Scalar value
      currentObj[key] = coerceValue(value);
    }
  }
  
  return result;
}

function coerceValue(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null' || val === '~') return null;
  if (/^-?\d+$/.test(val)) return parseInt(val, 10);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  return val;
}

function normalizeSectionName(name) {
  const map = {
    'overview': 'overview',
    'brand & style': 'overview',
    'brand and style': 'overview',
    'colors': 'colors',
    'typography': 'typography',
    'layout': 'layout',
    'layout & spacing': 'layout',
    'layout and spacing': 'layout',
    'elevation & depth': 'elevation',
    'elevation and depth': 'elevation',
    'elevation': 'elevation',
    'shapes': 'shapes',
    'components': 'components',
    "do's and don'ts": 'dosdonts',
    'dos and donts': 'dosdonts',
  };
  return map[name.toLowerCase()] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function loadSpec() {
  return SPEC_REFERENCE;
}

module.exports = { loadDesignMd, parseFrontmatter, loadSpec, parseSimpleYaml };
