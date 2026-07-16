#!/usr/bin/env node
'use strict';

// ─── ANSI Color Palette ───────────────────────────────────
const C = {
  reset:   '\x1b[0m',
  bright:  '\x1b[1m',  dim: '\x1b[2m',
  red:     '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue:    '\x1b[34m', magenta: '\x1b[35m', cyan: '\x1b[36m',
  white:   '\x1b[37m',
  bgRed:   '\x1b[41m', bgGreen: '\x1b[42m',
};

function c(text, color) { return `${C[color] || ''}${text}${C.reset}`; }

// ─── Banner ────────────────────────────────────────────────
const BANNER = `
${c('╔══════════════════════════════════════════════════════╗', 'cyan')}
${c('║', 'cyan')}     ${c('🎨  DESIGN.MD SYSTEM', 'bright')}  —  ${c('v1.0.0', 'dim')}                    ${c('║', 'cyan')}
${c('║', 'cyan')}     ${c('Google DESIGN.md Token Spec · AI Agent Toolkit', 'dim')}     ${c('║', 'cyan')}
${c('╚══════════════════════════════════════════════════════╝', 'cyan')}
`;

// ─── Help Text ────────────────────────────────────────────
const HELP = `
${BANNER}
${c('USAGE', 'bright')}
  ${c('npx design-md-system <command> [options]', 'green')}
  ${c('dmd <command> [options]', 'green')}              (shorthand)

${c('COMMANDS', 'bright')}
  ${c('init', 'yellow')}        [name]     Create a new DESIGN.md file from templates
  ${c('validate', 'yellow')}    <file>     Lint structure + WCAG contrast checks
  ${c('export', 'yellow')}      <file>     Export to Tailwind / DTCG / CSS / JSON
  ${c('diff', 'yellow')}        <a> <b>    Compare two DESIGN.md versions
  ${c('template', 'yellow')}    [style]    List or generate design system templates
  ${c('spec', 'yellow')}                   Print the DESIGN.md spec reference
  ${c('agent-info', 'yellow')}             Show AI agent compatibility matrix
  ${c('help', 'yellow')}                   Show this help

${c('EXAMPLES', 'bright')}
  ${c('$', 'dim')} design-md init my-brand
  ${c('$', 'dim')} design-md validate DESIGN.md
  ${c('$', 'dim')} design-md export DESIGN.md --format tailwind > tailwind.theme.json
  ${c('$', 'dim')} design-md diff DESIGN-v1.md DESIGN-v2.md
  ${c('$', 'dim')} design-md template --list
  ${c('$', 'dim')} dmd init acme-corp          ${c('# shorthand', 'dim')}

${c('PACKAGE MANAGERS', 'bright')}
  npx design-md-system init    ${c('npm | npx', 'dim')}
  yarn dlx design-md-system init
  pnpm dlx design-md-system init
  bunx design-md-system init
  deno run npm:design-md-system init  ${c('(Deno 2+)', 'dim')}

${c('AI AGENT INTEGRATIONS (60+)', 'bright')}
  ${c('design-md agent-info', 'green')} for full compatibility matrix

${c('LINKS', 'bright')}
  ${c('GitHub:', 'dim')}  https://github.com/uthumany/design-md-system
  ${c('npm:', 'dim')}     https://www.npmjs.com/package/design-md-system
  ${c('Spec:', 'dim')}    https://github.com/google-labs-code/design.md
`;

// ─── Argument Parser ───────────────────────────────────────
function parseArgs(args) {
  const options = {};
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
      options[key] = val;
    } else if (args[i].startsWith('-')) {
      const key = args[i].slice(1);
      const val = args[i + 1] && !args[i + 1].startsWith('-') ? args[++i] : true;
      options[key] = val;
    } else {
      positional.push(args[i]);
    }
  }
  return { command: positional[0] || 'help', args: positional.slice(1), options };
}

// ─── Command Handlers ──────────────────────────────────────
function cmdInit(args, options) {
  const { init } = require('../lib/templates');
  const name = args[0] || options.n || options.name || 'my-design-system';
  const style = options.s || options.style || 'minimal';
  const result = init(name, style);
  console.log(result);
}

function cmdValidate(args) {
  const { validate } = require('../lib/validator');
  const file = args[0] || 'DESIGN.md';
  const result = validate(file);
  if (result.errors.length > 0) {
    console.error(c(`\n❌ Validation failed with ${result.errors.length} error(s):`, 'red'));
    result.errors.forEach(e => console.error(`  ${c('✗', 'red')} ${e}`));
  }
  if (result.warnings.length > 0) {
    console.warn(c(`\n⚠️  ${result.warnings.length} warning(s):`, 'yellow'));
    result.warnings.forEach(w => console.warn(`  ${c('⚠', 'yellow')} ${w}`));
  }
  if (result.info.length > 0) {
    console.log(c(`\nℹ️  ${result.info.length} info:`, 'cyan'));
    result.info.forEach(i => console.log(`  ${c('ℹ', 'cyan')} ${i}`));
  }
  if (result.valid) {
    console.log(c('\n✅ DESIGN.md is valid!', 'green'));
    if (result.wcag) {
      console.log(c(`   WCAG AA contrast: ${result.wcag.aaPasses || 0}/${result.wcag.aaTotal || 0} passing`, 'green'));
    }
  }
  process.exit(result.errors.length > 0 ? 1 : 0);
}

function cmdExport(args, options) {
  const { exportTokens } = require('../lib/exporter');
  const file = args[0] || 'DESIGN.md';
  const format = options.f || options.format || 'tailwind';
  try {
    const result = exportTokens(file, format);
    if (options.o || options.output) {
      const fs = require('fs');
      fs.writeFileSync(options.o || options.output, result);
      console.log(c(`✅ Exported to ${options.o || options.output}`, 'green'));
    } else {
      console.log(result);
    }
  } catch (err) {
    console.error(c(`❌ Export failed: ${err.message}`, 'red'));
    process.exit(1);
  }
}

function cmdDiff(args) {
  const { diff } = require('../lib/validator');
  if (args.length < 2) {
    console.error(c('❌ Usage: design-md diff <file1> <file2>', 'red'));
    process.exit(1);
  }
  const result = diff(args[0], args[1]);
  console.log(result);
  process.exit(result.hasRegressions ? 1 : 0);
}

function cmdTemplate(args, options) {
  const { listTemplates, generateTemplate } = require('../lib/templates');
  if (options.list || options.l) {
    console.log(listTemplates());
  } else {
    const style = args[0] || options.s || options.style || 'minimal';
    console.log(generateTemplate(style));
  }
}

function cmdSpec() {
  const spec = require('../lib/loader').loadSpec();
  console.log(spec);
}

function cmdAgentInfo() {
  const { getCompatibilityMatrix } = require('../lib/agent-adapter');
  console.log(getCompatibilityMatrix());
}

// ─── Main Dispatch ─────────────────────────────────────────
function main() {
  const { command, args, options } = parseArgs(process.argv.slice(2));

  if (options.version || options.v) {
    console.log('design-md-system v1.0.0');
    process.exit(0);
  }

  switch (command) {
    case 'init':       cmdInit(args, options); break;
    case 'validate':
    case 'lint':       cmdValidate(args); break;
    case 'export':     cmdExport(args, options); break;
    case 'diff':       cmdDiff(args); break;
    case 'template':   cmdTemplate(args, options); break;
    case 'spec':       cmdSpec(); break;
    case 'agent-info':
    case 'agents':     cmdAgentInfo(); break;
    case 'help':
    case '--help':
    case '-h':         console.log(HELP); break;
    default:
      console.error(c(`❌ Unknown command: ${command}`, 'red'));
      console.error(c('   Run design-md help for usage.', 'dim'));
      process.exit(1);
  }
}

main();
