{
  module.exports = {
    e2e: {
      setupNodeEvents(on, config) {

      },
      baseUrl: 'http://localhost:3000/',
      "reporter": "mochawesome",
      "reporterOptions": {
        "reportDir": "mochawesome-report",
        "overwrite": false,
        "html": false,
        "json": true
      }
    },
  };
}


