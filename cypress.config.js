const { defineConfig } = require("cypress");
const pg = require('pg');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      on("task", {
        READFROMDB({dbConfig, sql})
        {
          const client = new pg.Pool(dbConfig)
          return client.query(sql)
        }
      })
  },
  DB: {
    user: "william-monroy",
    host: "ep-broken-salad-00817204.us-east-2.aws.neon.tech",
    database: "neondb",
    password: "FE90vBORUCgp",
    ssl: true,
    port: 5432  
  }
  }
});
  