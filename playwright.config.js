const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 60 * 1000,

  retries: 1,

 use: {
  headless: true,   
  viewport: { width: 1280, height: 720 },
  actionTimeout: 30 * 1000,
},


  reporter: [
    ['html', { open: 'never' }],
    ['./custom-reporter.js']
  ],
});
