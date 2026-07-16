# Contributing to design-md-system

First off, thank you for considering contributing! 🎉 This project thrives on community contributions — whether it's a new design template, an agent adapter, a bug fix, or documentation improvement.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to uthumany@gmail.com.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/uthumany/design-md-system/issues) as you might find that you don't need to create one. When you do create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** — code samples, terminal output, DESIGN.md files
- **Describe the behavior you observed and what you expected**
- **Include your environment** — OS, Node.js version, package manager
- **Include error messages and stack traces**

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

### ✨ Suggesting Features

Feature requests are welcome! Provide:

- **Clear description of the feature**
- **Use case** — who benefits, how it's used
- **Example API / CLI usage** if possible
- **Why it belongs in core** vs a plugin

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

### 🎨 Adding Design Templates

We love new design templates! Each template is defined in `lib/templates.js`. To add one:

1. Choose a unique `key` (lowercase, hyphens)
2. Add an entry to the `STYLES` object:
```javascript
'my-style': {
  name: 'My Style',
  description: 'Short description of the design aesthetic',
  colors: {
    primary: '#HEXHEX',
    secondary: '#HEXHEX',
    tertiary: '#HEXHEX',
    neutral: '#HEXHEX',
  },
  accent: '#HEXHEX',
},
```

3. Test your template generates correctly:
```bash
node -e "const {init} = require('./lib/templates'); console.log(init('test', 'my-style'));"
```

4. Add a test case in `test/index.test.js` verifying your style exists and generates valid output.

5. Update the README if your template fills a notable gap.

### 🔌 Adding Agent Integrations

Agent integrations live in `lib/agent-adapter.js`. To add agents:

1. Find the appropriate `AGENT_CATEGORIES` category
2. Add an entry:
```javascript
{ name: 'Agent Name', icon: '🆕', integration: 'npm-install', install: 'npm i -g design-md-system' },
```

3. Integration types: `npm-install`, `skill-file`, `native-skill`, `pip-install`, `import`, `extension`

4. Update the test that counts agents (currently expects 60).

### 📝 Improving Documentation

Documentation contributions are especially valued:

- Fix typos, grammar, or unclear explanations
- Add examples, tutorials, or use cases
- Translate documentation
- Improve SEO keywords and descriptions
- Add screenshots and GIFs

## Development Setup

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/design-md-system.git
cd design-md-system

# 2. Zero dependencies — you're ready!
node --version  # Need >= 18

# 3. Run tests
node --test test/index.test.js

# 4. Try the CLI
node bin/cli.js help
node bin/cli.js init test-brand
node bin/cli.js template --list
```

## Project Structure

```
design-md-system/
├── package.json          # npm metadata
├── index.js              # Public API
├── bin/cli.js            # CLI tool
├── lib/
│   ├── loader.js         # File parser
│   ├── validator.js      # Linting & WCAG
│   ├── exporter.js       # Export formats
│   ├── templates.js      # Design templates
│   └── agent-adapter.js  # Agent compatibility
├── test/
│   └── index.test.js     # 29 tests
├── docs/                 # Extra documentation
└── .github/              # GitHub templates
```

## Pull Request Process

1. **Fork the repo** and create your branch from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Write tests** for any new functionality:
   ```bash
   node --test test/index.test.js
   ```

3. **Ensure all tests pass** before submitting.

4. **Update documentation** — README, CHANGELOG, or docs/ as needed.

5. **Run the linter**:
   ```bash
   npm run lint
   ```

6. **Commit with clear messages** following [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add healthcare design template
   fix: handle missing color field in validator
   docs: update API reference table
   test: add edge case for empty frontmatter
   ```

7. **Push and open a PR** against the `main` branch.

8. **Address review feedback** — we'll review within 48 hours.

## Style Guide

### JavaScript
- ES6+ with CommonJS modules (`require`/`module.exports`)
- 2-space indentation
- Single quotes for strings
- Descriptive variable names
- JSDoc comments for public API functions

### Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs freely after the first line

### Tests
- One `describe` block per module
- Descriptive test names using "should"
- Test both happy path and error cases
- Clean up temp files after tests

## Recognition

All contributors will be recognized in:
- The [GitHub contributors graph](https://github.com/uthumany/design-md-system/graphs/contributors)
- Release notes for their specific contributions

Thank you for contributing to **design-md-system**! 🎨
