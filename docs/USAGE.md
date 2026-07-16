# Usage Guide — design-md-system

Comprehensive usage documentation with real-world examples for CLI, library API, CI/CD, and AI agent integration.

---

## CLI Usage

### Quick Reference

```bash
# Initialize a new DESIGN.md
design-md init <name> [--style <style>] [--name/-n <name>]

# Validate a DESIGN.md file
design-md validate <file>        # alias: lint

# Export design tokens
design-md export <file> --format <format> [--output/-o <file>]

# Diff two versions
design-md diff <file1> <file2>

# List templates
design-md template --list        # alias: -l

# Show spec reference
design-md spec

# Show agent compatibility
design-md agent-info             # alias: agents

# Help
design-md help                   # alias: --help, -h
```

### Init — Creating a New DESIGN.md

```bash
# Quick start with default (minimal)
design-md init my-brand

# Choose a specific style
design-md init acme-corp --style saas
design-md init dark-app --style dark
design-md init neobank --style fintech
design-md init web3-dapp --style web3

# Specify name explicitly
design-md init --name "My Design System" --style luxury

# Redirect to file
design-md init acme-corp --style corporate > DESIGN.md
```

**21 Available Styles:**
`minimal`, `modern`, `corporate`, `brutalist`, `dark`, `nature`, `retro`, `neon`, `luxury`, `playful`, `editorial`, `saas`, `fintech`, `healthcare`, `ecommerce`, `gaming`, `education`, `startup`, `agency`, `web3`, `accessibility-first`

### Validate — Linting Your DESIGN.md

```bash
# Basic validation
design-md validate DESIGN.md

# Validate a specific file
design-md validate path/to/design.md

# Alias (same command)
design-md lint DESIGN.md

# Exit codes:
#   0 = valid (no errors)
#   1 = errors found
```

**What it checks:**
- ✅ Required fields (colors must exist)
- ✅ Hex color format validation
- ✅ Token reference resolution (`{colors.primary}` → must exist)
- ✅ Component property whitelist
- ✅ Typography field validation
- ✅ Section ordering
- ✅ WCAG AA/AAA contrast ratios

**Example output:**
```
✅ DESIGN.md is valid!
   WCAG AA contrast: 3/3 passing

--- or ---

❌ Validation failed with 2 error(s):
  ✗ Broken token reference: "{colors.missing}" — target not found
  ✗ Color "primary" value "not-a-color" is not a hex color (must start with #)

⚠️  1 warning(s):
  ⚠ Component "button-main" has unknown property "shadow"

ℹ️  1 info:
  ℹ Section "custom-section" is non-canonical — preserved but not validated
```

### Export — Converting Tokens

```bash
# Export to Tailwind CSS theme
design-md export DESIGN.md --format tailwind > tailwind.theme.json

# Export to W3C DTCG format
design-md export DESIGN.md --format dtcg > tokens.json

# Export to CSS custom properties
design-md export DESIGN.md --format css --output variables.css

# Export to JSON
design-md export DESIGN.md --format json

# Short flags
design-md export DESIGN.md -f css -o vars.css
```

**Tailwind Export Example:**
```json
{
  "theme": {
    "extend": {
      "colors": {
        "primary": "#1A1C1E",
        "secondary": "#6C7278",
        "tertiary": "#B8422E",
        "neutral": "#F7F5F2"
      },
      "fontFamily": {
        "h1": ["Public Sans", "sans-serif"],
        "body-md": ["Public Sans", "sans-serif"]
      },
      "fontSize": {
        "h1": "3rem",
        "body-md": "1rem"
      },
      "borderRadius": {
        "sm": "4px",
        "md": "8px",
        "lg": "16px"
      },
      "spacing": {
        "sm": "8px",
        "md": "16px",
        "lg": "24px"
      }
    }
  }
}
```

**CSS Export Example:**
```css
:root {
  --color-primary: #1A1C1E;
  --color-secondary: #6C7278;
  --color-tertiary: #B8422E;
  --color-neutral: #F7F5F2;
  --font-family-h1: Public Sans;
  --font-size-h1: 3rem;
  --font-weight-h1: 700;
  --line-height-h1: 1.1;
  --radius-sm: 4px;
  --radius-md: 8px;
  --spacing-md: 16px;
}
```

**DTCG Export Example:**
```json
{
  "color-primary": {
    "$type": "color",
    "$value": "#1A1C1E"
  },
  "fontSize-h1": {
    "$type": "dimension",
    "$value": "3rem"
  }
}
```

### Diff — Comparing Versions

```bash
# Compare two versions
design-md diff DESIGN-v1.md DESIGN-v2.md

# Exit codes:
#   0 = no regressions
#   1 = regressions detected
```

**Example output:**
```
~ Color "primary" changed: #1A1C1E → #2A2C2E
+ Color "accent" was added: #0066CC
~ Component "button-primary" changed

⚠️  Regressions detected!
```

---

## Library API Usage

### Node.js

```javascript
const dmd = require('design-md-system');

// ─── Validation ───────────────────────────────
const result = dmd.validate('./DESIGN.md');

if (!result.valid) {
  console.error('DESIGN.md has errors:');
  result.errors.forEach(e => console.error('  ✗', e));
  process.exit(1);
}

console.log(`✅ Valid! WCAG AA: ${result.wcag.aaPasses}/${result.wcag.aaTotal}`);

if (result.wcag.aaFailures > 0) {
  console.warn('WCAG failures:');
  result.wcag.failures.forEach(f => console.warn('  ⚠', f));
}

// ─── Export ──────────────────────────────────
const tailwind = dmd.exportTokens('./DESIGN.md', 'tailwind');
fs.writeFileSync('tailwind.config.theme.json', tailwind);

const cssVars = dmd.exportTokens('./DESIGN.md', 'css');
fs.writeFileSync('src/styles/variables.css', cssVars);

const dtcg = dmd.exportTokens('./DESIGN.md', 'dtcg');
fs.writeFileSync('tokens.json', dtcg);

// ─── Diff ────────────────────────────────────
const changes = dmd.diff('./DESIGN-v1.md', './DESIGN-v2.md');
console.log(changes);

// ─── Programmatic Init ────────────────────────
const content = dmd.init('acme-design', 'saas');
fs.writeFileSync('./DESIGN.md', content);

// ─── Templates ───────────────────────────────
console.log(dmd.listTemplates());
// Available design system templates:
//   minimal    Minimal      Clean, minimal design...

const specificTemplate = dmd.generateTemplate('dark');
console.log(specificTemplate);

// ─── Agent Check ──────────────────────────────
const agent = dmd.isAgentCompatible('Claude Code');
if (agent) {
  console.log(`${agent.name} is compatible via ${agent.integration}`);
  console.log(`Install: ${agent.install}`);
}

// ─── Load & Parse ─────────────────────────────
const parsed = dmd.loadDesignMd('./DESIGN.md');
console.log(parsed.frontmatter.name);          // "acme-design"
console.log(parsed.frontmatter.colors);         // { primary: "#1A1C1E", ... }
console.log(Object.keys(parsed.sections));      // ['overview', 'colors', ...]

// ─── Spec Reference ──────────────────────────
console.log(dmd.loadSpec());
```

### React / Next.js

```javascript
// tailwind.config.js
const theme = require('./tailwind.config.theme.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: theme.theme.extend,
  },
  plugins: [],
};
```

```javascript
// next.config.js — Validate at build time
const dmd = require('design-md-system');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const result = dmd.validate('./DESIGN.md');
      if (!result.valid) {
        console.warn('⚠️ DESIGN.md validation warnings:', result.errors);
      }
    }
    return config;
  },
};
```

### Vue / Nuxt

```javascript
// nuxt.config.ts
import { validate } from 'design-md-system';

export default defineNuxtConfig({
  hooks: {
    'build:before'() {
      const result = validate('./DESIGN.md');
      if (!result.valid) {
        console.error('DESIGN.md invalid — build may fail:', result.errors);
      }
    },
  },
  css: ['~/assets/css/variables.css'], // Generated by design-md export
});
```

### Build Pipeline / CI/CD

```javascript
// validate-tokens.js — Run before build
const dmd = require('design-md-system');
const fs = require('fs');

const result = dmd.validate('./DESIGN.md');

if (!result.valid) {
  console.error('❌ Design tokens invalid. Fix before building.');
  result.errors.forEach(e => console.error('  -', e));
  process.exit(1);
}

// Export tokens for build
fs.writeFileSync('./src/generated/tokens.json', dmd.exportTokens('./DESIGN.md', 'json'));
fs.writeFileSync('./src/generated/variables.css', dmd.exportTokens('./DESIGN.md', 'css'));

console.log('✅ Design tokens validated and exported.');
```

---

## AI Agent Integration Examples

### Hermes Agent (Native Skill)

Hermes Agent has a built-in `design-md` skill. To use:

1. Reference DESIGN.md in your project
2. Hermes automatically loads the design-md skill when DESIGN.md is detected
3. The agent validates, exports, and applies tokens during UI generation

### Claude Code

Add to your `.claude` config or `CLAUDE.md`:

```markdown
## Design System

This project uses DESIGN.md for design tokens. Before making UI changes:

1. Validate: `npx design-md-system validate DESIGN.md`
2. Use theme: Import `tailwind.config.theme.json`
3. Check contrast: WCAG results are in validation output
```

### VS Code / Cline / Codex IDE

The package is available via npm. Use the CLI in terminal or integrate via the library API in build scripts.

### GitHub Actions

```yaml
name: Validate Design Tokens
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Validate DESIGN.md
        run: npx design-md-system validate DESIGN.md
      - name: Export to Tailwind
        run: npx design-md-system export DESIGN.md --format tailwind > tailwind.theme.json
```

---

## Advanced Usage

### Custom Template Creation

```javascript
const dmd = require('design-md-system');

// Use init() as a starting point, then customize
let content = dmd.init('custom-brand', 'minimal');

// Post-process: replace specific values
content = content.replace('#1A1C1E', '#CUSTOM');
content = content.replace('Inter', 'CustomFont');

fs.writeFileSync('./DESIGN.md', content);
```

### Batch Processing

```javascript
const dmd = require('design-md-system');
const fs = require('fs');
const path = require('path');

// Validate all DESIGN.md files in a monorepo
const designFiles = fs.readdirSync('.', { recursive: true })
  .filter(f => f.endsWith('DESIGN.md'));

for (const file of designFiles) {
  const result = dmd.validate(file);
  console.log(`${file}: ${result.valid ? '✅' : '❌'}`);
  if (result.wcag) {
    console.log(`  WCAG AA: ${result.wcag.aaPasses}/${result.wcag.aaTotal}`);
  }
}
```

### Programmatic Contrast Checking

```javascript
const dmd = require('design-md-system');

const ratio = dmd.contrastRatio('#1A1C1E', '#FFFFFF');
console.log(`Contrast: ${ratio.toFixed(2)}:1`);
// => Contrast: 15.48:1

const meetsAA = ratio >= 4.5;   // true
const meetsAAA = ratio >= 7.0;  // true
```

---

## See Also

- [INSTALLATION.md](INSTALLATION.md) — Installation guide
- [COMPATIBILITY.md](COMPATIBILITY.md) — AI agent compatibility
- [CONTRIBUTING.md](../CONTRIBUTING.md) — How to contribute
- [CHANGELOG.md](../CHANGELOG.md) — Version history
