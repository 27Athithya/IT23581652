const fs = require('fs');
const path = require('path');

class MarkdownReporter {
  constructor() {
    this.results = [];
  }

  onBegin(config, suite) {
    console.log(`Starting test execution...`);
  }

  onTestEnd(test, result) {
    const testData = {
      title: test.title,
      status: result.status,
      duration: result.duration,
      input: null,
      output: null,
      expected: null,
      error: null
    };

    this.results.push(testData);
  }

  onEnd(result) {
    const reportPath = path.join(__dirname, 'test-report.md');
    let markdown = `# Test Execution Report\n\n`;
    markdown += `**Date:** ${new Date().toLocaleString()}\n\n`;
    markdown += `**Total Tests:** ${this.results.length}\n`;
    markdown += `**Passed:** ${this.results.filter(r => r.status === 'passed').length}\n`;
    markdown += `**Failed:** ${this.results.filter(r => r.status === 'failed').length}\n\n`;
    markdown += `---\n\n`;

    this.results.forEach((test, index) => {
      const statusEmoji = test.status === 'passed' ? '✅' : '❌';
      markdown += `## ${index + 1}. ${test.title}\n\n`;
      markdown += `**Status:** ${statusEmoji} ${test.status.toUpperCase()}\n\n`;
      markdown += `**Duration:** ${test.duration}ms\n\n`;

      if (test.input) {
        markdown += `**Input:** \`${test.input}\`\n\n`;
      }

      if (test.output) {
        markdown += `**Output:** \`${test.output}\`\n\n`;
      }

      if (test.expected) {
        markdown += `**Expected:** \`${test.expected}\`\n\n`;
      }

      if (test.error) {
        markdown += `**Error:**\n\`\`\`\n${test.error}\n\`\`\`\n\n`;
      }

      markdown += `---\n\n`;
    });

    fs.writeFileSync(reportPath, markdown);
    console.log(`\n✅ Markdown report generated: ${reportPath}`);
  }
}

module.exports = MarkdownReporter;
