'use strict';

/**
 * design-md-system — Main entry point
 * 
 * Programmatic API for DESIGN.md token spec operations.
 * 
 * @module design-md-system
 * 
 * @example
 * const dmd = require('design-md-system');
 * 
 * // Validate a DESIGN.md file
 * const result = dmd.validate('path/to/DESIGN.md');
 * console.log(result.valid, result.errors);
 * 
 * // Export design tokens
 * const tailwindTheme = dmd.exportTokens('DESIGN.md', 'tailwind');
 * 
 * // Generate a new DESIGN.md from template
 * const content = dmd.init('my-brand', 'minimal');
 * 
 * // List available templates
 * const templates = dmd.listTemplates();
 */

const { validate, diff } = require('./lib/validator');
const { exportTokens, formats } = require('./lib/exporter');
const { init, listTemplates, generateTemplate, styles } = require('./lib/templates');
const { loadSpec, loadDesignMd, parseFrontmatter } = require('./lib/loader');
const { getCompatibilityMatrix, agentCategories, isAgentCompatible } = require('./lib/agent-adapter');

// Re-export everything
module.exports = {
  // Validation
  validate,
  diff,
  
  // Export
  exportTokens,
  formats,
  
  // Templates
  init,
  listTemplates,
  generateTemplate,
  styles,
  
  // Loader
  loadSpec,
  loadDesignMd,
  parseFrontmatter,
  
  // Agent compatibility
  getCompatibilityMatrix,
  agentCategories,
  isAgentCompatible,
  
  // Version
  version: '1.0.0',
  
  // Constants
  SPEC_VERSION: 'alpha',
  SPEC_REPO: 'https://github.com/google-labs-code/design.md',
};
