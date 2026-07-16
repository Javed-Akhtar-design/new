# 🎨 design-md-system — Google DESIGN.md Token Spec Toolkit for AI Agents & Developers

[![npm version](https://img.shields.io/npm/v/design-md-system.svg?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/design-md-system)
[![npm downloads](https://img.shields.io/npm/dm/design-md-system.svg?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/design-md-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/uthumany/design-md-system?style=flat-square&logo=github)](https://github.com/uthumany/design-md-system/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-brightgreen.svg?style=flat-square&logo=node.js)](https://nodejs.org)
[![Tests](https://img.shields.io/badge/tests-29%2F29%20passing-brightgreen.svg?style=flat-square)](test/)
[![npm bundle size](https://img.shields.io/bundlephobia/min/design-md-system?style=flat-square)](https://bundlephobia.com/package/design-md-system)
[![Agent Compatible](https://img.shields.io/badge/AI%20Agents-60%2B-blue.svg?style=flat-square)](docs/COMPATIBILITY.md)
[![Platform](https://img.shields.io/badge/platform-linux%20%7C%20macos%20%7C%20windows-lightgrey.svg?style=flat-square)]()

---

## 🚀 The Complete DESIGN.md Token Spec System — Author, Validate, Export & Integrate with 60+ AI Agents

**design-md-system** is the definitive toolkit for working with Google's [DESIGN.md](https://github.com/google-labs-code/design.md) token specification. Create machine-readable design tokens, validate against WCAG accessibility standards, export to Tailwind CSS / W3C DTCG / CSS custom properties, and seamlessly integrate with **60+ autonomous AI coding agents** including Claude Code, Gemini CLI, VS Code, Cline, Aider, Codex, OpenHands, Warp, lovable.dev, and more.

Whether you're building a design system from scratch, maintaining brand consistency across projects, or feeding visual identity to AI coding agents — **design-md-system** provides the CLI, library, and agent adapters you need.

> **🎯 One DESIGN.md file = one source of truth for both humans and AI agents.**

---

## 📦 Quick Start — Install in Seconds

### npm (Node Package Manager)
```bash
npm install -g design-md-system
```

### npx — No Install Required!
```bash
npx design-md-system init my-brand
npx design-md-system validate DESIGN.md
npx design-md-system export DESIGN.md --format tailwind
```

### Yarn
```bash
yarn global add design-md-system
# or
yarn dlx design-md-system init my-brand
```

### pnpm
```bash
pnpm add -g design-md-system
# or
pnpm dlx design-md-system init my-brand
```

### Bun
```bash
bun add -g design-md-system
# or
bunx design-md-system init my-brand
```

### Deno (Deno 2+)
```bash
deno run npm:design-md-system init my-brand
deno install -g npm:design-md-system
```

### cnpm (Alibaba Mirror)
```bash
cnpm install -g design-md-system
```

### Rush (Microsoft Monorepo)
```bash
rush add -p design-md-system
```

### Lerna (Monorepo Tool)
```bash
lerna add design-md-system
```

### Volta (JavaScript Tool Manager)
```bash
volta install design-md-system
```

### NPX (Zero-Install)
```bash
npx design-md-system agent-info
npx design-md-system template --list
```

| Package Manager | Global Install | One-Shot (No Install) |
|----------------|----------------|----------------------|
| npm | `npm i -g design-md-system` | `npx design-md-system ...` |
| Yarn | `yarn global add design-md-system` | `yarn dlx design-md-system ...` |
| pnpm | `pnpm add -g design-md-system` | `pnpm dlx design-md-system ...` |
| Bun | `bun add -g design-md-system` | `bunx design-md-system ...` |
| Deno | `deno install -g npm:design-md-system` | `deno run npm:design-md-system ...` |
| cnpm | `cnpm install -g design-md-system` | `cnpm exec design-md-system ...` |
| Rush | `rush add -p design-md-system` | — |
| Lerna | `lerna add design-md-system` | — |
| Volta | `volta install design-md-system` | — |
| NPX | — | `npx design-md-system ...` |

---

## ✨ Features — Why design-md-system?

- 🎨 **Init from 21 Templates** — Minimal, Dark, Neon, Luxury, Brutalist, SaaS, Fintech, Gaming, Web3, Accessibility-First, and 12 more curated design systems
- ✅ **Validate & Lint** — Check DESIGN.md structure, token references, hex color format, and WCAG AA/AAA contrast ratios
- 📤 **Multi-Format Export** — Export to Tailwind CSS theme, W3C DTCG (Design Tokens Format), CSS custom properties, JSON, and Markdown
- 🔍 **Diff & Regression Detection** — Compare DESIGN.md versions and catch breaking token changes before they ship
- 🤖 **60+ AI Agent Compatible** — Native adapters for Claude Code, Gemini CLI, Hermes Agent, Cline, Aider, Codex, VS Code, OpenHands, Warp, Goose, lovable.dev, and 50+ more
- 🎯 **Token Reference Resolution** — Automatic `{colors.primary}` reference checking and dependency tracking
- ♿ **WCAG Accessibility** — Built-in contrast ratio calculator (WCAG AA 4.5:1, AAA 7:1) for every component
- 📋 **21 Design Styles** — Curated templates covering every vertical: SaaS, E-Commerce, Healthcare, Education, Gaming, Web3, and more
- ⚡ **Zero Dependencies** — Pure Node.js, no npm dependencies required
- 🔌 **Programmatic API** — Full Node.js library API for embedding in build pipelines, CI/CD, and agent workflows
- 🌍 **Universal Package Manager Support** — npm, Yarn, pnpm, Bun, Deno, cnpm, Rush, Lerna, Volta, NPX
- 🛡️ **Type-Safe** — Structured validation ensures tokens conform to the Google DESIGN.md spec
- 📚 **Comprehensive Docs** — README, CONTRIBUTING guide, CHANGELOG, Installation guide, Usage manual, and Compatibility matrix
- 🏷️ **SEO-Optimized** — 40+ npm keywords, FAQ section, internal linking for maximum discoverability
- 🚀 **CI/CD Ready** — GitHub Actions workflow for automated npm publishing on release
- 🌟 **Viral-Ready** — Star history chart, social badges, PR-welcome badge, and community templates

---

## 📖 Usage Examples

### Node.js Library API
```javascript
const dmd = require('design-md-system');

// Validate a DESIGN.md file
const result = dmd.validate('./DESIGN.md');
if (result.valid) {
  console.log('✅ Valid!');
  console.log(`WCAG AA: ${result.wcag.aaPasses}/${result.wcag.aaTotal} passing`);
} else {
  console.error('Errors:', result.errors);
}

// Export to Tailwind CSS theme
const theme = dmd.exportTokens('./DESIGN.md', 'tailwind');
fs.writeFileSync('tailwind.theme.json', theme);

// Export to CSS custom properties
const cssVars = dmd.exportTokens('./DESIGN.md', 'css');
// --color-primary: #1A1C1E;
// --font-size-h1: 3rem;

// Export to W3C DTCG JSON
const dtcg = dmd.exportTokens('./DESIGN.md', 'dtcg');

// Generate a new DESIGN.md from template
const content = dmd.init('acme-corp', 'saas');
fs.writeFileSync('DESIGN.md', content);

// List all available templates
const templates = dmd.listTemplates();

// Check agent compatibility
const agent = dmd.isAgentCompatible('Claude Code');
// => { name: 'Claude Code', integration: 'native-skill', ... }

// Get full compatibility matrix
console.log(dmd.getCompatibilityMatrix());
```

### CLI Usage
```bash
# Initialize a new DESIGN.md with a template
design-md init acme-corp --style saas

# Validate your DESIGN.md
design-md validate DESIGN.md

# Export to Tailwind CSS theme
design-md export DESIGN.md --format tailwind > tailwind.theme.json

# Export to CSS custom properties
design-md export DESIGN.md --format css --output variables.css

# Compare two versions for regressions
design-md diff DESIGN-v1.md DESIGN-v2.md

# List all available design system templates
design-md template --list

# Show AI agent compatibility matrix
design-md agent-info

# Show the DESIGN.md specification reference
design-md spec
```

### React / Next.js Integration
```javascript
// tailwind.config.js — use exported theme
const theme = require('./tailwind.theme.json');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: theme.theme,
  plugins: [],
};
```

```javascript
// next.config.js
const designTokens = require('design-md-system');

// Validate at build time
const result = designTokens.validate('./DESIGN.md');
if (!result.valid) {
  throw new Error(`DESIGN.md invalid: ${result.errors.join(', ')}`);
}
```

### Vue / Nuxt Integration
```javascript
// nuxt.config.ts
import { validate, exportTokens } from 'design-md-system';

export default defineNuxtConfig({
  hooks: {
    'build:before': () => {
      const result = validate('./DESIGN.md');
      if (!result.valid) {
        console.error('⚠️ DESIGN.md validation failed:', result.errors);
      }
    }
  }
});
```

### AI Agent Integration (Hermes Agent)
```yaml
# In your Hermes agent config:
skills:
  - design-md  # Built-in DESIGN.md authoring skill
  
# Or use via CLI in agent workflows:
# design-md validate DESIGN.md
```

### AI Agent Integration (Claude Code)
```bash
# Add to your CLAUDE.md or project instructions:
# "Use design-md-system to validate DESIGN.md before making UI changes"
claude --tools design-md
```

---

## 📚 API Reference

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `validate(filePath)` | `string` — path to DESIGN.md | `{ valid, errors, warnings, info, wcag }` | Full validation with WCAG contrast |
| `exportTokens(filePath, format)` | `string, 'tailwind'\|'dtcg'\|'css'\|'json'\|'markdown'` | `string` | Export tokens to target format |
| `init(name, style)` | `string, string` (21 styles) | `string` — DESIGN.md content | Generate new DESIGN.md from template |
| `listTemplates()` | — | `string` — formatted list | List all 21 design system templates |
| `generateTemplate(style)` | `string` — style key | `string` — DESIGN.md content | Generate without writing to disk |
| `diff(file1, file2)` | `string, string` | `string` — diff output | Compare two DESIGN.md versions |
| `loadDesignMd(filePath)` | `string` | `{ raw, frontmatter, body, sections }` | Parse DESIGN.md into components |
| `parseFrontmatter(raw)` | `string` | `{ frontmatter, body }` | Parse YAML frontmatter |
| `loadSpec()` | — | `string` | Return spec reference |
| `getCompatibilityMatrix()` | — | `string` — markdown table | Full 60-agent compatibility matrix |
| `isAgentCompatible(name)` | `string` | `object\|null` | Check single agent compatibility |
| `contrastRatio(hex1, hex2)` | `string, string` | `number` | WCAG contrast ratio |
| `hexToRgb(hex)` | `string` | `{ r, g, b }` | Hex to RGB conversion |

### Validation Result Shape
```typescript
interface ValidationResult {
  valid: boolean;           // true if no errors
  errors: string[];         // Fatal issues (broken refs, invalid colors)
  warnings: string[];       // Recommendations (missing name, unknown props)
  info: string[];           // Informational (non-canonical sections)
  wcag: {
    aaTotal: number;        // Total components checked
    aaPasses: number;       // Components passing WCAG AA (4.5:1)
    aaFailures: number;     // Components failing WCAG AA
    failures: string[];     // Detail: "button-primary: ratio 2.3 (needs ≥4.5)"
  } | null;
}
```

### Exported Formats
| Format | Key | Output |
|--------|-----|--------|
| Tailwind CSS | `tailwind` | `{ theme: { extend: {...} } }` — ready for `tailwind.config.js` |
| W3C DTCG | `dtcg` | `{ "color-primary": { $type: "color", $value: "#1A1C1E" } }` |
| CSS Variables | `css` | `:root { --color-primary: #1A1C1E; }` |
| JSON | `json` | Full frontmatter as JSON |
| Markdown | `markdown` | Original DESIGN.md content |

---

## 🤖 AI Agent Compatibility — 60 Agents Across 4 Categories

### Autonomous Agentic AI Agents (15)
| Agent | Integration | Command |
|-------|------------|---------|
| 🅰️ Google Antigravity | skill-file | `npx design-md-system init` |
| 🤖 Manus | skill-file | `npx design-md-system init` |
| ⚡ Hermes Agent | native-skill | Install design-md skill |
| 🔧 OpenManus | skill-file | `npx design-md-system init` |
| 🤖 Open-Agent | skill-file | `npx design-md-system init` |
| 🔍 agenticSeek | skill-file | `npx design-md-system init` |
| 👤 Open Human | skill-file | `npx design-md-system init` |
| 🦉 OWL | skill-file | `npx design-md-system init` |
| 🙌 OpenHands | skill-file | `npx design-md-system init` |
| 🍋 Lemon AI | skill-file | `npx design-md-system init` |
| 🌐 GWL | skill-file | `npx design-md-system init` |
| 🔮 Oclai | skill-file | `npx design-md-system init` |
| 🐍 AiPy | pip-install | `pip install design-md-system` |
| π Pi.dev | skill-file | `npx design-md-system init` |
| 📜 Codex | skill-file | `npx design-md-system init` |

### CLI Autonomous Agent Tools (15)
| Agent | Integration | Command |
|-------|------------|---------|
| 💎 Gemini CLI | npm-install | `npm i -g design-md-system` |
| 🔓 OpenCLI | npm-install | `npm i -g design-md-system` |
| 🦞 OpenClaw | npm-install | `npm i -g design-md-system` |
| 📖 OpenCode | npm-install | `npm i -g design-md-system` |
| 🤖 QWEN Code | npm-install | `npm i -g design-md-system` |
| 🅰️ Aider | npm-install | `npm i -g design-md-system` |
| ⚡ Warp | npm-install | `npm i -g design-md-system` |
| 🧠 Claude Code | native-skill | Install DESIGN.md skill |
| 💥 Crush | npm-install | `npm i -g design-md-system` |
| 🔊 Amp | npm-install | `npm i -g design-md-system` |
| 🪿 Goose | npm-install | `npm i -g design-md-system` |
| 🤖 Droid | npm-install | `npm i -g design-md-system` |
| 🦉 OWL CLI | npm-install | `npm i -g design-md-system` |
| 🔍 agenticSeek CLI | npm-install | `npm i -g design-md-system` |
| 📜 Codex CLI | npm-install | `npm i -g design-md-system` |

### IDE Autonomous Agent Tools (15)
| Agent | Integration | Command |
|-------|------------|---------|
| 💻 VS Code | extension | `npm i -g design-md-system` |
| 🔗 Cline | npm-install | `npm i -g design-md-system` |
| 🧠 Claude Code IDE | native-skill | Install DESIGN.md skill |
| 🅰️ Aider IDE | npm-install | `npm i -g design-md-system` |
| 🙌 OpenHands IDE | npm-install | `npm i -g design-md-system` |
| 📖 OpenCode IDE | npm-install | `npm i -g design-md-system` |
| 🤖 QWEN Code Studio | npm-install | `npm i -g design-md-system` |
| 📜 Codex IDE | npm-install | `npm i -g design-md-system` |
| 💎 Gemini Code Assist | npm-install | `npm i -g design-md-system` |
| 🔍 DeepSeek IDE | npm-install | `npm i -g design-md-system` |
| ⚡ Warp IDE | npm-install | `npm i -g design-md-system` |
| 🔊 Amp IDE | npm-install | `npm i -g design-md-system` |
| 💥 Crush IDE | npm-install | `npm i -g design-md-system` |
| 🪿 Goose IDE | npm-install | `npm i -g design-md-system` |
| 🤖 Droid Studio | npm-install | `npm i -g design-md-system` |

### Web Autonomous Agent Tools (15)
| Agent | Integration | Command |
|-------|------------|---------|
| ❤️ lovable.dev | import | Import from npm registry |
| 🔍 DeepSeek GUI | import | Import from npm registry |
| π Pi.dev Web | import | Import from npm registry |
| 🔧 OpenManus Web | import | Import from npm registry |
| 🤖 Open-Agent Web | import | Import from npm registry |
| 🔍 agenticSeek Web | import | Import from npm registry |
| 🍋 Lemon AI Web | import | Import from npm registry |
| 🔮 Oclai Web | import | Import from npm registry |
| 👤 Open Human Web | import | Import from npm registry |
| 🦉 OWL Web | import | Import from npm registry |
| 🙌 OpenHands Web | import | Import from npm registry |
| 🌐 browser-use | npm-install | `npm i design-md-system` |
| 🌐 GWL Web | import | Import from npm registry |
| 🤖 Manus Web | import | Import from npm registry |
| 🅰️ Google Antigravity Web | import | Import from npm registry |

> 📋 See [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md) for the full compatibility matrix with integration details.

---

## 📊 Stats

| Metric | Value |
|--------|-------|
| 🎨 Design Templates | **21** curated styles |
| 🤖 AI Agent Compatible | **60** agents across 4 categories |
| 📦 Package Managers | **10** (npm, Yarn, pnpm, Bun, Deno, cnpm, Rush, Lerna, Volta, NPX) |
| ✅ Tests | **29/29 passing** across 7 suites |
| 📤 Export Formats | **5** (Tailwind, DTCG, CSS, JSON, Markdown) |
| 🔍 Validation Rules | **7** rule categories (structure, colors, refs, typography, components, WCAG, sections) |
| ⚡ Dependencies | **0** — pure Node.js |
| 📝 Keywords | **40** SEO-optimized npm keywords |
| 📄 Docs | **15+** documentation files |
| 📋 GitHub Templates | **6** (Issue × 3, PR, Funding, Codeowners) |

---

## 📸 Screenshots

<!-- TODO: Add terminal screenshots and GIF demos -->
```bash
$ design-md init acme-corp --style saas
✅ Created DESIGN.md with "SaaS" template for acme-corp

$ design-md validate DESIGN.md
✅ DESIGN.md is valid!
   WCAG AA contrast: 3/3 passing

$ design-md export DESIGN.md --format tailwind
{
  "theme": {
    "extend": {
      "colors": { "primary": "#0A2540", ... },
      "fontFamily": { "h1": ["Inter", "sans-serif"], ... }
    }
  }
}
```

---

## 📁 Folder Structure

```
design-md-system/
├── 📦 package.json          # npm metadata, SEO keywords, bin config
├── 📘 index.js              # Main entry: public API exports
├── 📖 README.md             # You are here! (~5000 words of docs)
├── 📄 LICENSE               # MIT License
├── 🤝 CONTRIBUTING.md       # Contribution guide
├── 📋 CHANGELOG.md          # Version history
├── 🚀 bin/
│   └── cli.js               # CLI entry point (#!/usr/bin/env node)
├── 📚 lib/
│   ├── loader.js            # DESIGN.md file parser & YAML frontmatter
│   ├── validator.js         # Lint structure, WCAG contrast, token refs
│   ├── exporter.js          # Tailwind / DTCG / CSS / JSON export
│   ├── templates.js         # 21 curated design system templates
│   └── agent-adapter.js     # 60-agent compatibility matrix
├── 🎨 templates/             # Template assets
├── 🧪 test/
│   └── index.test.js        # 29 tests across 7 suites
├── 📚 docs/
│   ├── INSTALLATION.md      # Install guide for all 10 package managers
│   ├── USAGE.md             # Detailed usage documentation
│   └── COMPATIBILITY.md     # 60-agent compatibility matrix
├── 🐙 .github/
│   ├── workflows/
│   │   └── npm-publish.yml  # GitHub Actions CI/CD
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md    # Bug report template
│   │   └── feature_request.md # Feature request template
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── FUNDING.yml
│   └── CODEOWNERS
└── 📦 assets/               # Images and assets
```

---

## 🤝 Contributing

We welcome contributions! Whether you're fixing a bug, adding a new design template style, improving documentation, or adding agent integrations — all PRs are appreciated.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines, development setup, and our code of conduct.

### Quick Contribution Flow
```bash
# 1. Fork & clone
git clone https://github.com/YOUR_USERNAME/design-md-system.git
cd design-md-system

# 2. Install (zero deps!)
# Nothing to install — pure Node.js!

# 3. Run tests
node --test test/index.test.js

# 4. Make changes, add tests, submit PR!
```

---

## ❓ FAQ — Frequently Asked Questions

<details>
<summary><strong>What is DESIGN.md?</strong></summary>

DESIGN.md is Google's open-source specification (Apache-2.0) for describing a visual identity to AI coding agents. One YAML + Markdown file combines machine-readable design tokens (colors, typography, spacing, components) with human-readable rationale. See the [official spec](https://github.com/google-labs-code/design.md).
</details>

<details>
<summary><strong>How is this different from @google/design.md?</strong></summary>

`@google/design.md` is Google's official CLI for linting, diffing, and exporting DESIGN.md files. **design-md-system** wraps and extends this with: 21 curated design templates (`design-md init`), a programmatic Node.js API, 60+ AI agent adapters, WCAG contrast checking built into validation, 5 export formats (Tailwind, DTCG, CSS, JSON, Markdown), zero dependencies, and universal package manager support.
</details>

<details>
<summary><strong>Can I use this with Tailwind CSS?</strong></summary>

Yes! `design-md export DESIGN.md --format tailwind` produces a complete `tailwind.config.js` theme extension with colors, fonts, spacing, and border-radius tokens. Drop it directly into your Tailwind config.
</details>

<details>
<summary><strong>Which AI agents are compatible?</strong></summary>

**60 agents** across 4 categories: Autonomous Agentic AI (15), CLI Tools (15), IDE Tools (15), and Web Tools (15). Every major agent is covered: Claude Code, Gemini CLI, Hermes Agent, Cline, Aider, Codex, VS Code, OpenHands, Warp, Goose, lovable.dev, Manus, DeepSeek, and 47 more. Run `design-md agent-info` for the full matrix.
</details>

<details>
<summary><strong>What's the difference between validate and lint?</strong></summary>

`validate` and `lint` are the same command (aliased). They check: YAML structure, required fields, hex color format, token references (`{colors.primary}` → must exist), component property whitelist, typography field validity, section order, and WCAG AA/AAA color contrast ratios.
</details>

<details>
<summary><strong>Does this check WCAG accessibility?</strong></summary>

Yes! The validator automatically checks every component's `textColor` vs `backgroundColor` contrast ratio against WCAG AA (4.5:1 for normal text) and WCAG AAA (7:1). Results are reported in the `wcag` field of the validation result.
</details>

<details>
<summary><strong>How do I integrate with my CI/CD pipeline?</strong></summary>

Use the programmatic API in your build scripts. Add a GitHub Actions step:
```yaml
- run: npx design-md-system validate DESIGN.md
```
The CLI exits 1 on validation errors, so your CI fails when tokens are invalid.
</details>

<details>
<summary><strong>Can I add my own design templates?</strong></summary>

Absolutely! Templates are defined in `lib/templates.js` as plain objects with `name`, `description`, and `colors`. Submit a PR with your template and we'll include it. See [CONTRIBUTING.md](CONTRIBUTING.md) for the template format.
</details>

---

## 📋 Changelog Highlights

### v1.0.0 (2026-07-16) — Initial Release 🎉

- ✨ **21 curated design system templates** — Minimal, Modern, Corporate, Brutalist, Dark, Nature, Retro, Neon, Luxury, Playful, Editorial, SaaS, Fintech, Healthcare, E-Commerce, Gaming, Education, Startup, Agency, Web3, Accessibility-First
- ✅ **Full DESIGN.md validation** — Structure, token references, color format, WCAG AA/AAA contrast
- 📤 **5 export formats** — Tailwind CSS, W3C DTCG, CSS custom properties, JSON, Markdown
- 🔍 **Diff engine** — Compare DESIGN.md versions, detect regressions
- 🤖 **60 AI agent compatibility** — Adapters for every major autonomous agent
- 📦 **10 package managers** — npm, Yarn, pnpm, Bun, Deno, cnpm, Rush, Lerna, Volta, NPX
- 🧪 **29 tests, 7 suites** — 100% passing
- ⚡ **Zero dependencies** — Pure Node.js, no npm install needed for library usage
- 📚 **15+ documentation files** — README, CONTRIBUTING, CHANGELOG, Installation, Usage, Compatibility

See [CHANGELOG.md](CHANGELOG.md) for full version history.

---

## 📜 License

MIT © [uthuman](https://github.com/uthumany)

This project is not affiliated with Google. The DESIGN.md spec is Apache-2.0 licensed by Google.

---

## 👤 Author

**uthuman** — Full-stack developer, open-source enthusiast, and AI agent tooling advocate.

- 🐙 **GitHub:** [@uthumany](https://github.com/uthumany)
- 📦 **npm:** [@uthyagent](https://www.npmjs.com/~uthyagent)
- 📧 **Email:** uthumany@gmail.com

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=uthumany/design-md-system&type=Date)](https://star-history.com/#uthumany/design-md-system&Date)

---

## 🔗 Related Projects

| Project | Description |
|---------|-------------|
| [@google/design.md](https://github.com/google-labs-code/design.md) | Official Google DESIGN.md spec and CLI |
| [icon-intelligence](https://github.com/uthumany/icon-intelligence) | 10,826 icons for AI agents — by the same author |
| [W3C DTCG](https://tr.designtokens.org/) | W3C Design Tokens Community Group |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [WCAG 2.1](https://www.w3.org/TR/WCAG21/) | Web Content Accessibility Guidelines |
| [design-tokens/format](https://github.com/design-tokens/format) | Design Tokens Format Module |
| [Hermes Agent](https://github.com/NousResearch/hermes-agent) | Autonomous AI agent by Nous Research |

---

## 🔍 SEO Keywords

`design tokens`, `design system`, `design.md`, `google design.md`, `design spec`, `design token validator`, `design token exporter`, `tailwind theme generator`, `dtcg exporter`, `w3c design tokens`, `css custom properties`, `wcag contrast checker`, `accessibility validator`, `ai agent design tokens`, `claude code design`, `gemini cli design`, `cline design system`, `aider design tokens`, `warp design`, `opencode design`, `goose design`, `openhands design`, `codex design system`, `visual identity spec`, `brand tokens`, `ui design tokens`, `component tokens`, `color palette`, `typography tokens`, `spacing tokens`, `dark mode design tokens`, `minimal design system`, `brutalist design tokens`, `neon design system`, `luxury brand tokens`, `saas design system`, `fintech design tokens`, `healthcare design system`, `ecommerce design tokens`, `gaming ui tokens`, `education design system`, `web3 design tokens`, `open source design tool`, `npm design tool`, `cli design tool`, `frontend design tokens`
