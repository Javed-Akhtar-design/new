'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// Import all library modules
const { validate, diff, contrastRatio, hexToRgb } = require('../lib/validator');
const { exportTokens, formats } = require('../lib/exporter');
const { init, listTemplates, generateTemplate, styles } = require('../lib/templates');
const { loadDesignMd, parseFrontmatter, loadSpec, parseSimpleYaml } = require('../lib/loader');
const { getCompatibilityMatrix, isAgentCompatible, agentCategories } = require('../lib/agent-adapter');

// ─── Loader Tests ─────────────────────────────────────────
describe('Loader', () => {
  it('should parse YAML frontmatter', () => {
    const raw = `---
name: Test
colors:
  primary: "#1A1C1E"
---\n\n## Overview\n\nTest body.`;
    const result = parseFrontmatter(raw);
    assert.strictEqual(result.frontmatter.name, 'Test');
    assert.strictEqual(result.frontmatter.colors.primary, '#1A1C1E');
    assert.ok(result.body.includes('Test body'));
  });

  it('should handle files without frontmatter', () => {
    const result = parseFrontmatter('## Overview\n\nJust markdown.');
    assert.deepStrictEqual(result.frontmatter, {});
    assert.ok(result.body.includes('Just markdown'));
  });

  it('should parse nested YAML objects', () => {
    const yaml = `typography:
  h1:
    fontFamily: Inter
    fontSize: 3rem`;
    const result = parseSimpleYaml(yaml);
    assert.strictEqual(result.typography.h1.fontFamily, 'Inter');
    assert.strictEqual(result.typography.h1.fontSize, '3rem');
  });

  it('should coerce YAML values', () => {
    const yaml = `flag: true
count: 42
name: hello`;
    const result = parseSimpleYaml(yaml);
    assert.strictEqual(result.flag, true);
    assert.strictEqual(result.count, 42);
    assert.strictEqual(result.name, 'hello');
  });

  it('should load spec reference', () => {
    const spec = loadSpec();
    assert.ok(spec.includes('Canonical Section Order'));
    assert.ok(spec.includes('Component Property Whitelist'));
  });
});

// ─── Validator Tests ──────────────────────────────────────
describe('Validator', () => {
  it('should validate a valid DESIGN.md', () => {
    const content = `---
version: alpha
name: Test
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "#FFFFFF"
---\n\n## Overview\n\nTest.`;
    const tmpPath = path.join(__dirname, '..', 'test-valid.md');
    fs.writeFileSync(tmpPath, content);
    const result = validate(tmpPath);
    fs.unlinkSync(tmpPath);
    assert.ok(result.valid);
    assert.strictEqual(result.errors.length, 0);
  });

  it('should detect broken token references', () => {
    const content = `---
version: alpha
name: Test
colors:
  primary: "#1A1C1E"
components:
  button-primary:
    backgroundColor: "{colors.missing}"
    textColor: "#FFFFFF"
---\n\n## Overview\n\nUsing {colors.missing}.`;
    const tmpPath = path.join(__dirname, '..', 'test-broken-ref.md');
    fs.writeFileSync(tmpPath, content);
    const result = validate(tmpPath);
    fs.unlinkSync(tmpPath);
    assert.ok(result.errors.some(e => e.includes('Broken token reference')));
  });

  it('should warn about missing name', () => {
    const content = `---
version: alpha
colors:
  primary: "#1A1C1E"
---\n\n## Overview\n\nTest.`;
    const tmpPath = path.join(__dirname, '..', 'test-no-name.md');
    fs.writeFileSync(tmpPath, content);
    const result = validate(tmpPath);
    fs.unlinkSync(tmpPath);
    // Missing name is a warning, not error
    assert.ok(result.warnings.some(w => w.includes('Missing "name"')));
  });

  it('should validate hex color format', () => {
    const content = `---
version: alpha
name: Test
colors:
  primary: "not-a-color"
---\n\n## Overview`;
    const tmpPath = path.join(__dirname, '..', 'test-bad-color.md');
    fs.writeFileSync(tmpPath, content);
    const result = validate(tmpPath);
    fs.unlinkSync(tmpPath);
    assert.ok(result.errors.some(e => e.includes('not a hex color')));
  });
});

// ─── Exporter Tests ───────────────────────────────────────
describe('Exporter', () => {
  it('should export to Tailwind format', () => {
    const content = `---
version: alpha
name: Test
colors:
  primary: "#1A1C1E"
  accent: "#0066CC"
typography:
  h1:
    fontFamily: Inter
    fontSize: 3rem
  body:
    fontSize: 1rem
---\n\n## Overview`;
    const tmpPath = path.join(__dirname, '..', 'test-export.md');
    fs.writeFileSync(tmpPath, content);
    const result = exportTokens(tmpPath, 'tailwind');
    fs.unlinkSync(tmpPath);
    const parsed = JSON.parse(result);
    assert.ok(parsed.theme);
    assert.strictEqual(parsed.theme.extend.colors.primary, '#1A1C1E');
    assert.strictEqual(parsed.theme.extend.fontSize.h1, '3rem');
  });

  it('should export to CSS custom properties', () => {
    const content = `---
version: alpha
name: Test
colors:
  primary: "#1A1C1E"
---\n\n## Overview`;
    const tmpPath = path.join(__dirname, '..', 'test-css.md');
    fs.writeFileSync(tmpPath, content);
    const result = exportTokens(tmpPath, 'css');
    fs.unlinkSync(tmpPath);
    assert.ok(result.includes('--color-primary'));
    assert.ok(result.includes('#1A1C1E'));
    assert.ok(result.startsWith(':root {'));
  });

  it('should export to DTCG format', () => {
    const content = `---
version: alpha
name: Test
colors:
  primary: "#1A1C1E"
---\n\n## Overview`;
    const tmpPath = path.join(__dirname, '..', 'test-dtcg.md');
    fs.writeFileSync(tmpPath, content);
    const result = exportTokens(tmpPath, 'dtcg');
    fs.unlinkSync(tmpPath);
    const parsed = JSON.parse(result);
    assert.strictEqual(parsed['color-primary'].$type, 'color');
    assert.strictEqual(parsed['color-primary'].$value, '#1A1C1E');
  });

  it('should throw on unknown format', () => {
    const content = `---
version: alpha
name: Test
colors:
  primary: "#1A1C1E"
---\n\n## Overview`;
    const tmpPath = path.join(__dirname, '..', 'test-fmt.md');
    fs.writeFileSync(tmpPath, content);
    assert.throws(() => exportTokens(tmpPath, 'unknown'), /Unknown format/);
    fs.unlinkSync(tmpPath);
  });

  it('should expose supported formats', () => {
    assert.ok(formats.includes('tailwind'));
    assert.ok(formats.includes('dtcg'));
    assert.ok(formats.includes('css'));
    assert.ok(formats.includes('json'));
    assert.ok(formats.includes('markdown'));
  });
});

// ─── Templates Tests ──────────────────────────────────────
describe('Templates', () => {
  it('should have 21 template styles', () => {
    assert.strictEqual(Object.keys(styles).length, 21);
  });

  it('should init a design file with custom name', () => {
    const result = init('acme-corp', 'minimal');
    assert.ok(result.includes('name: acme-corp'));
    assert.ok(result.includes('## Overview'));
    assert.ok(result.includes('## Colors'));
    assert.ok(result.includes('## Components'));
  });

  it('should list all templates', () => {
    const list = listTemplates();
    assert.ok(list.includes('minimal'));
    assert.ok(list.includes('dark'));
    assert.ok(list.includes('luxury'));
    assert.ok(list.includes('accessibility-first'));
  });

  it('should default to minimal on unknown style', () => {
    const result = generateTemplate('nonexistent');
    assert.ok(result.includes('minimal'));
    const result2 = init('test', 'nonexistent');
    assert.ok(result2.includes('minimal'));
  });

  it('should generate each style without errors', () => {
    for (const key of Object.keys(styles)) {
      const result = init(`test-${key}`, key);
      assert.ok(result.includes('version: alpha'));
      assert.ok(result.includes('colors:'));
      assert.ok(result.includes('## Overview'));
    }
  });
});

// ─── Agent Adapter Tests ──────────────────────────────────
describe('Agent Adapter', () => {
  it('should have 4 agent categories', () => {
    assert.strictEqual(Object.keys(agentCategories).length, 4);
  });

  it('should have 60 total agents', () => {
    let total = 0;
    for (const agents of Object.values(agentCategories)) {
      total += agents.length;
    }
    assert.strictEqual(total, 60);
  });

  it('should return compatibility matrix as markdown', () => {
    const matrix = getCompatibilityMatrix();
    assert.ok(matrix.includes('AI Agent Compatibility Matrix'));
    assert.ok(matrix.includes('Claude Code'));
    assert.ok(matrix.includes('Hermes Agent'));
    assert.ok(matrix.includes('Gemini CLI'));
    assert.ok(matrix.includes('lovable.dev'));
  });

  it('should check agent compatibility', () => {
    const result = isAgentCompatible('Claude Code');
    assert.ok(result);
    assert.strictEqual(result.name, 'Claude Code');
    assert.strictEqual(result.integration, 'native-skill');
  });

  it('should return null for unknown agent', () => {
    assert.strictEqual(isAgentCompatible('nonexistent-agent'), null);
  });
});

// ─── Contrast Ratio Tests ─────────────────────────────────
describe('Contrast Ratio', () => {
  it('should convert hex to rgb', () => {
    const rgb = hexToRgb('#FF0000');
    assert.strictEqual(rgb.r, 255);
    assert.strictEqual(rgb.g, 0);
    assert.strictEqual(rgb.b, 0);
  });

  it('should calculate high contrast ratio (black on white)', () => {
    const ratio = contrastRatio('#000000', '#FFFFFF');
    assert.ok(ratio > 20); // ~21:1
  });

  it('should calculate low contrast ratio', () => {
    const ratio = contrastRatio('#666666', '#777777');
    assert.ok(ratio < 2);
  });
});

// ─── Diff Tests ───────────────────────────────────────────
describe('Diff', () => {
  it('should diff two design files', () => {
    const content1 = `---
version: alpha
name: V1
colors:
  primary: "#1A1C1E"
---\n\n## Overview\n\nV1`;
    const content2 = `---
version: alpha
name: V2
colors:
  primary: "#FF0000"
---\n\n## Overview\n\nV2`;

    const tmp1 = path.join(__dirname, '..', 'test-diff1.md');
    const tmp2 = path.join(__dirname, '..', 'test-diff2.md');
    fs.writeFileSync(tmp1, content1);
    fs.writeFileSync(tmp2, content2);
    
    const result = diff(tmp2, tmp1);
    assert.ok(result.includes('changed'));
    
    fs.unlinkSync(tmp1);
    fs.unlinkSync(tmp2);
  });

  it('should detect no changes', () => {
    const content = `---
version: alpha
name: Same
colors:
  primary: "#1A1C1E"
---\n\n## Overview`;
    const tmp1 = path.join(__dirname, '..', 'test-same1.md');
    const tmp2 = path.join(__dirname, '..', 'test-same2.md');
    fs.writeFileSync(tmp1, content);
    fs.writeFileSync(tmp2, content);
    
    const result = diff(tmp1, tmp2);
    assert.ok(result.includes('No changes'));
    
    fs.unlinkSync(tmp1);
    fs.unlinkSync(tmp2);
  });
});
