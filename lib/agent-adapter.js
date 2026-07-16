'use strict';

/**
 * AI Agent Compatibility Adapter
 * 
 * Provides the canonical 60+ agent compatibility matrix and
 * adapter functions for major agent platforms.
 */

const AGENT_CATEGORIES = {
  'Autonomous Agentic AI Agents': [
    { name: 'Google Antigravity', icon: '🅰️', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'Manus', icon: '🤖', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'Hermes Agent', icon: '⚡', integration: 'native-skill', install: 'Install design-md skill' },
    { name: 'OpenManus', icon: '🔧', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'Open-Agent', icon: '🤖', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'agenticSeek', icon: '🔍', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'Open Human', icon: '👤', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'OWL', icon: '🦉', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'OpenHands', icon: '🙌', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'Lemon AI', icon: '🍋', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'GWL', icon: '🌐', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'Oclai', icon: '🔮', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'AiPy', icon: '🐍', integration: 'pip-install', install: 'pip install design-md-system' },
    { name: 'Pi.dev', icon: 'π', integration: 'skill-file', install: 'npx design-md-system init' },
    { name: 'Codex', icon: '📜', integration: 'skill-file', install: 'npx design-md-system init' },
  ],
  'CLI Autonomous Agent Tools': [
    { name: 'Gemini CLI', icon: '💎', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'OpenCLI', icon: '🔓', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'OpenClaw', icon: '🦞', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'OpenCode', icon: '📖', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'QWEN Code', icon: '🤖', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Aider', icon: '🅰️', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Warp', icon: '⚡', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Claude Code', icon: '🧠', integration: 'native-skill', install: 'Install DESIGN.md skill' },
    { name: 'Crush', icon: '💥', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Amp', icon: '🔊', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Goose', icon: '🪿', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Droid', icon: '🤖', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'OWL CLI', icon: '🦉', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'agenticSeek CLI', icon: '🔍', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Codex CLI', icon: '📜', integration: 'npm-install', install: 'npm i -g design-md-system' },
  ],
  'IDE Autonomous Agent Tools': [
    { name: 'VS Code', icon: '💻', integration: 'extension', install: 'npm i -g design-md-system' },
    { name: 'Cline', icon: '🔗', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Claude Code IDE', icon: '🧠', integration: 'native-skill', install: 'Install DESIGN.md skill' },
    { name: 'Aider IDE', icon: '🅰️', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'OpenHands IDE', icon: '🙌', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'OpenCode IDE', icon: '📖', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'QWEN Code Studio', icon: '🤖', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Codex IDE', icon: '📜', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Gemini Code Assist', icon: '💎', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'DeepSeek IDE', icon: '🔍', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Warp IDE', icon: '⚡', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Amp IDE', icon: '🔊', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Crush IDE', icon: '💥', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Goose IDE', icon: '🪿', integration: 'npm-install', install: 'npm i -g design-md-system' },
    { name: 'Droid Studio', icon: '🤖', integration: 'npm-install', install: 'npm i -g design-md-system' },
  ],
  'Web Autonomous Agent Tools': [
    { name: 'lovable.dev', icon: '❤️', integration: 'import', install: 'Import from npm registry' },
    { name: 'DeepSeek GUI', icon: '🔍', integration: 'import', install: 'Import from npm registry' },
    { name: 'Pi.dev Web', icon: 'π', integration: 'import', install: 'Import from npm registry' },
    { name: 'OpenManus Web', icon: '🔧', integration: 'import', install: 'Import from npm registry' },
    { name: 'Open-Agent Web', icon: '🤖', integration: 'import', install: 'Import from npm registry' },
    { name: 'agenticSeek Web', icon: '🔍', integration: 'import', install: 'Import from npm registry' },
    { name: 'Lemon AI Web', icon: '🍋', integration: 'import', install: 'Import from npm registry' },
    { name: 'Oclai Web', icon: '🔮', integration: 'import', install: 'Import from npm registry' },
    { name: 'Open Human Web', icon: '👤', integration: 'import', install: 'Import from npm registry' },
    { name: 'OWL Web', icon: '🦉', integration: 'import', install: 'Import from npm registry' },
    { name: 'OpenHands Web', icon: '🙌', integration: 'import', install: 'Import from npm registry' },
    { name: 'browser-use', icon: '🌐', integration: 'npm-install', install: 'npm i design-md-system' },
    { name: 'GWL Web', icon: '🌐', integration: 'import', install: 'Import from npm registry' },
    { name: 'Manus Web', icon: '🤖', integration: 'import', install: 'Import from npm registry' },
    { name: 'Google Antigravity Web', icon: '🅰️', integration: 'import', install: 'Import from npm registry' },
  ],
};

/**
 * Get formatted compatibility matrix.
 * @returns {string}
 */
function getCompatibilityMatrix() {
  const lines = [];
  lines.push('# 🤖 AI Agent Compatibility Matrix — design-md-system\n');
  lines.push(`**${countAgents()} AI agent tools** across 4 categories are compatible with design-md-system.\n`);
  
  for (const [category, agents] of Object.entries(AGENT_CATEGORIES)) {
    lines.push(`## ${category} (${agents.length} tools)\n`);
    lines.push('| Agent | Integration | Command |');
    lines.push('|-------|-------------|---------|');
    for (const agent of agents) {
      lines.push(`| ${agent.icon} ${agent.name} | ${agent.integration} | \`${agent.install}\` |`);
    }
    lines.push('');
  }
  
  return lines.join('\n');
}

function countAgents() {
  let count = 0;
  for (const agents of Object.values(AGENT_CATEGORIES)) {
    count += agents.length;
  }
  return count;
}

/**
 * Check if an agent is compatible.
 * @param {string} agentName
 * @returns {object|null}
 */
function isAgentCompatible(agentName) {
  for (const agents of Object.values(AGENT_CATEGORIES)) {
    const found = agents.find(a => a.name.toLowerCase() === agentName.toLowerCase());
    if (found) return found;
  }
  return null;
}

module.exports = { getCompatibilityMatrix, agentCategories: AGENT_CATEGORIES, isAgentCompatible };
