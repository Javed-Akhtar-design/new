# AI Agent Compatibility Matrix

**design-md-system** is compatible with **60 autonomous AI coding agents** across 4 categories. This document provides the complete compatibility matrix with integration details.

---

## Legend

| Integration Type | Meaning |
|-----------------|---------|
| `npm-install` | Install globally via npm/Yarn/pnpm/Bun |
| `skill-file` | Copy SKILL.md or DESIGN.md into agent's skill directory |
| `native-skill` | Built-in skill — no additional setup needed |
| `pip-install` | Install via pip (Python agents) |
| `import` | Import from npm registry in web-based agents |
| `extension` | IDE extension or plugin |

---

## Category 1: Autonomous Agentic AI Agents (15)

| # | Agent | Integration | Install Command |
|---|-------|------------|-----------------|
| 1 | Google Antigravity | skill-file | `npx design-md-system init` |
| 2 | Manus | skill-file | `npx design-md-system init` |
| 3 | Hermes Agent | native-skill | Built-in `design-md` skill |
| 4 | OpenManus | skill-file | `npx design-md-system init` |
| 5 | Open-Agent | skill-file | `npx design-md-system init` |
| 6 | agenticSeek | skill-file | `npx design-md-system init` |
| 7 | Open Human | skill-file | `npx design-md-system init` |
| 8 | OWL | skill-file | `npx design-md-system init` |
| 9 | OpenHands | skill-file | `npx design-md-system init` |
| 10 | Lemon AI | skill-file | `npx design-md-system init` |
| 11 | GWL | skill-file | `npx design-md-system init` |
| 12 | Oclai | skill-file | `npx design-md-system init` |
| 13 | AiPy | pip-install | `pip install design-md-system` |
| 14 | Pi.dev | skill-file | `npx design-md-system init` |
| 15 | Codex | skill-file | `npx design-md-system init` |

---

## Category 2: CLI Autonomous Agent Tools (15)

| # | Agent | Integration | Install Command |
|---|-------|------------|-----------------|
| 1 | Gemini CLI | npm-install | `npm i -g design-md-system` |
| 2 | OpenCLI | npm-install | `npm i -g design-md-system` |
| 3 | OpenClaw | npm-install | `npm i -g design-md-system` |
| 4 | OpenCode | npm-install | `npm i -g design-md-system` |
| 5 | QWEN Code | npm-install | `npm i -g design-md-system` |
| 6 | Aider | npm-install | `npm i -g design-md-system` |
| 7 | Warp | npm-install | `npm i -g design-md-system` |
| 8 | Claude Code | native-skill | Built-in DESIGN.md skill |
| 9 | Crush | npm-install | `npm i -g design-md-system` |
| 10 | Amp | npm-install | `npm i -g design-md-system` |
| 11 | Goose | npm-install | `npm i -g design-md-system` |
| 12 | Droid | npm-install | `npm i -g design-md-system` |
| 13 | OWL CLI | npm-install | `npm i -g design-md-system` |
| 14 | agenticSeek CLI | npm-install | `npm i -g design-md-system` |
| 15 | Codex CLI | npm-install | `npm i -g design-md-system` |

---

## Category 3: IDE Autonomous Agent Tools (15)

| # | Agent | Integration | Install Command |
|---|-------|------------|-----------------|
| 1 | VS Code | extension | `npm i -g design-md-system` |
| 2 | Cline | npm-install | `npm i -g design-md-system` |
| 3 | Claude Code IDE | native-skill | Built-in DESIGN.md skill |
| 4 | Aider IDE | npm-install | `npm i -g design-md-system` |
| 5 | OpenHands IDE | npm-install | `npm i -g design-md-system` |
| 6 | OpenCode IDE | npm-install | `npm i -g design-md-system` |
| 7 | QWEN Code Studio | npm-install | `npm i -g design-md-system` |
| 8 | Codex IDE | npm-install | `npm i -g design-md-system` |
| 9 | Gemini Code Assist | npm-install | `npm i -g design-md-system` |
| 10 | DeepSeek IDE | npm-install | `npm i -g design-md-system` |
| 11 | Warp IDE | npm-install | `npm i -g design-md-system` |
| 12 | Amp IDE | npm-install | `npm i -g design-md-system` |
| 13 | Crush IDE | npm-install | `npm i -g design-md-system` |
| 14 | Goose IDE | npm-install | `npm i -g design-md-system` |
| 15 | Droid Studio | npm-install | `npm i -g design-md-system` |

---

## Category 4: Web Autonomous Agent Tools (15)

| # | Agent | Integration | Install Command |
|---|-------|------------|-----------------|
| 1 | lovable.dev | import | Import from npm registry |
| 2 | DeepSeek GUI | import | Import from npm registry |
| 3 | Pi.dev Web | import | Import from npm registry |
| 4 | OpenManus Web | import | Import from npm registry |
| 5 | Open-Agent Web | import | import from npm registry |
| 6 | agenticSeek Web | import | Import from npm registry |
| 7 | Lemon AI Web | import | Import from npm registry |
| 8 | Oclai Web | import | Import from npm registry |
| 9 | Open Human Web | import | Import from npm registry |
| 10 | OWL Web | import | Import from npm registry |
| 11 | OpenHands Web | import | Import from npm registry |
| 12 | browser-use | npm-install | `npm i design-md-system` |
| 13 | GWL Web | import | Import from npm registry |
| 14 | Manus Web | import | Import from npm registry |
| 15 | Google Antigravity Web | import | Import from npm registry |

---

## Summary

| Category | Agents | Primary Integration |
|----------|--------|--------------------|
| Autonomous Agentic AI | 15 | skill-file / native-skill |
| CLI Tools | 15 | npm-install |
| IDE Tools | 15 | npm-install / extension |
| Web Tools | 15 | import / npm-install |
| **TOTAL** | **60** | — |

---

## Integration Depth

### Native Support (Built-in Skills)
- **Hermes Agent** — `design-md` skill ships with Hermes Agent
- **Claude Code** — DESIGN.md skill is natively supported

### Package-Based (Global Install)
All npm-install agents can use `design-md-system` globally:
```bash
npm install -g design-md-system
design-md help
```

### File-Based (Skill Import)
For skill-file agents, copy the generated DESIGN.md into the agent's skill directory:
```bash
npx design-md-system init my-brand > ~/.agent/skills/DESIGN.md
```

### Registry-Based (Web Import)
Web agents can import `design-md-system` directly from the npm registry.

---

For programmatic compatibility checking:
```javascript
const dmd = require('design-md-system');
const matrix = dmd.getCompatibilityMatrix();   // Full markdown table
const agent = dmd.isAgentCompatible('Claude Code'); // Single check
```
