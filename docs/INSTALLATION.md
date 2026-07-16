# Installing design-md-system

Complete installation guide for all supported package managers and environments.

## Global Installation

### npm
```bash
npm install -g design-md-system
design-md help
```

### Yarn
```bash
yarn global add design-md-system
design-md help
```

### pnpm
```bash
pnpm add -g design-md-system
design-md help
```

### Bun
```bash
bun add -g design-md-system
design-md help
```

### Deno (Deno 2+)
```bash
deno install -g npm:design-md-system
design-md help
```

### cnpm (Alibaba Mirror)
```bash
cnpm install -g design-md-system
design-md help
```

### Volta
```bash
volta install design-md-system
design-md help
```

## Zero-Install / One-Shot Usage

No installation required for one-off usage:

### npx (npm)
```bash
npx design-md-system init my-brand
npx design-md-system validate DESIGN.md
npx design-md-system export DESIGN.md --format tailwind
```

### yarn dlx
```bash
yarn dlx design-md-system init my-brand
```

### pnpm dlx
```bash
pnpm dlx design-md-system init my-brand
```

### bunx
```bash
bunx design-md-system init my-brand
```

### deno run
```bash
deno run npm:design-md-system init my-brand
```

## Project-Level Installation

### npm
```bash
npm install --save-dev design-md-system
```

### Yarn
```bash
yarn add --dev design-md-system
```

### pnpm
```bash
pnpm add -D design-md-system
```

### Bun
```bash
bun add --dev design-md-system
```

## Monorepo Installation

### Rush
```bash
rush add -p design-md-system
```

### Lerna
```bash
lerna add design-md-system
```

## Python Environment (AiPy)

```bash
pip install design-md-system
```

## Verification

After installation, verify it works:

```bash
design-md help
design-md version
design-md template --list
design-md agent-info
```

Expected output: Help text, version v1.0.0, list of 21 templates, and 60-agent compatibility matrix.

## Requirements

- **Node.js ≥ 18.0.0** (for npm/Yarn/pnpm/Bun/cnpm/Rush/Lerna/Volta)
- **Deno ≥ 2.0** (for Deno installation)
- **Python ≥ 3.8** (for pip installation via AiPy)
- **Zero npm dependencies** — no `npm install` needed for library usage

## Troubleshooting

### "command not found: design-md"
Ensure your global bin directory is in `$PATH`. For npm:
```bash
npm config get prefix
# Add {prefix}/bin to your PATH
```

### "design-md: Permission denied"
```bash
chmod +x $(which design-md)
```

### "Error: Cannot find module 'design-md-system'"
Install globally or run from project directory:
```bash
npm install -g design-md-system
# or
cd /path/to/project && npm install design-md-system
```

### Node.js version too old
```bash
node --version  # Need ≥ 18
nvm install 18  # or nvm install 22
```

## Upgrading

### npm
```bash
npm update -g design-md-system
```

### Yarn
```bash
yarn global upgrade design-md-system
```

### pnpm
```bash
pnpm update -g design-md-system
```

### Bun
```bash
bun update -g design-md-system
```

## Uninstalling

### npm
```bash
npm uninstall -g design-md-system
```

### Yarn
```bash
yarn global remove design-md-system
```

### pnpm
```bash
pnpm remove -g design-md-system
```

### Bun
```bash
bun remove -g design-md-system
```

## Next Steps

After installation:
1. Run `design-md init my-brand` to create your first DESIGN.md
2. Run `design-md template --list` to explore design styles
3. Check [USAGE.md](USAGE.md) for detailed examples
4. See [COMPATIBILITY.md](COMPATIBILITY.md) for AI agent integrations
