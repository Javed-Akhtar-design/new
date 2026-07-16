# Changelog

All notable changes to design-md-system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-07-16

### Added — Initial Release 🎉

#### Core Features
- **DESIGN.md Validation Engine** — Full linting for structure, token references, color format, typography fields, component property whitelist, section ordering, and WCAG AA/AAA contrast checking
- **Multi-Format Exporter** — Export to Tailwind CSS theme (`--format tailwind`), W3C DTCG (`--format dtcg`), CSS custom properties (`--format css`), JSON (`--format json`), and original Markdown (`--format markdown`)
- **Design Template System** — `init` command with 21 curated styles
- **Diff Engine** — Compare two DESIGN.md versions, detect regressions in colors, typography, and components
- **AI Agent Adapter** — 60-agent compatibility matrix across 4 categories

#### Design Templates (21 Styles)
- `minimal` — Clean, restrained design
- `modern` — Contemporary with vibrant accents
- `corporate` — Professional enterprise-grade
- `brutalist` — Raw, bold, unapologetic
- `dark` — Atmospheric dark mode
- `nature` — Organic, earthy tones
- `retro` — Vintage-inspired warmth
- `neon` — Cyberpunk aesthetics
- `luxury` — Premium gold and dark tones
- `playful` — Fun, energetic, bright
- `editorial` — Publication-grade typography
- `saas` — Modern SaaS with trusted blues
- `fintech` — Financial technology trust signals
- `healthcare` — Calming medical design
- `ecommerce` — Conversion-optimized
- `gaming` — Immersive dynamic UI
- `education` — Accessible clear hierarchy
- `startup` — Bold gradients and modern aesthetics
- `agency` — Creative expressive typography
- `web3` — Decentralized dark mode
- `accessibility-first` — WCAG AAA-optimized

#### CLI Commands
- `init [name]` — Create new DESIGN.md from template
- `validate <file>` / `lint` — Validate DESIGN.md structure and WCAG
- `export <file> --format <fmt>` — Export to 5 formats
- `diff <a> <b>` — Compare two DESIGN.md files
- `template --list` — List available styles
- `spec` — Print DESIGN.md spec reference
- `agent-info` / `agents` — Show 60-agent compatibility matrix
- `help` — Show usage guide

#### Library API
- `validate(filePath)` → `{ valid, errors, warnings, info, wcag }`
- `exportTokens(filePath, format)` → string
- `init(name, style)` → DESIGN.md content
- `listTemplates()` → formatted list
- `generateTemplate(style)` → DESIGN.md content
- `diff(file1, file2)` → diff output with regression detection
- `loadDesignMd(filePath)` → `{ raw, frontmatter, body, sections }`
- `parseFrontmatter(raw)` → `{ frontmatter, body }`
- `loadSpec()` → spec reference
- `getCompatibilityMatrix()` → markdown table
- `isAgentCompatible(name)` → agent object or null
- `contrastRatio(hex1, hex2)` → number
- `hexToRgb(hex)` → `{ r, g, b }`

#### Testing
- **29 tests across 7 suites** — 100% passing
- Test suites: Loader, Validator, Exporter, Templates, Agent Adapter, Contrast Ratio, Diff
- Covers: happy paths, error cases, edge cases, all 21 templates, all 5 export formats, contrast calculation accuracy

#### Documentation
- **README.md** (~26,000 chars) — 20+ sections with full SEO optimization
- **CONTRIBUTING.md** — Detailed contribution guide
- **CHANGELOG.md** — This file
- **LICENSE** — MIT
- **docs/INSTALLATION.md** — Install guide for all 10 package managers
- **docs/USAGE.md** — Comprehensive usage documentation
- **docs/COMPATIBILITY.md** — Full 60-agent compatibility matrix
- **.github/ISSUE_TEMPLATE/bug_report.md** — Bug report template
- **.github/ISSUE_TEMPLATE/feature_request.md** — Feature request template
- **.github/PULL_REQUEST_TEMPLATE.md** — PR template
- **.github/FUNDING.yml** — Sponsorship config
- **.github/CODEOWNERS** — Code ownership
- **.github/workflows/npm-publish.yml** — GitHub Actions CI/CD

#### Package Ecosystem
- **10 package managers supported:** npm, Yarn, pnpm, Bun, Deno, cnpm, Rush, Lerna, Volta, NPX
- **40 SEO-optimized npm keywords**
- **Zero dependencies** — Pure Node.js ≥ 18
- **48,247 bytes** total source code

#### AI Agent Compatibility
- **60 agents across 4 categories:**
  - 15 Autonomous Agentic AI Agents (Manus, Hermes, OpenManus, OWL, Codex, etc.)
  - 15 CLI Autonomous Agent Tools (Gemini CLI, Claude Code, Aider, Warp, Goose, etc.)
  - 15 IDE Autonomous Agent Tools (VS Code, Cline, OpenHands, QWEN Code Studio, etc.)
  - 15 Web Autonomous Agent Tools (lovable.dev, DeepSeek GUI, browser-use, etc.)

---

## Version History

| Version | Date | Type | Changes |
|---------|------|------|---------|
| 1.0.0 | 2026-07-16 | Initial | First public release |

---

[1.0.0]: https://github.com/uthumany/design-md-system/releases/tag/v1.0.0
