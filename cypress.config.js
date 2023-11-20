const { defineConfig } = require("cypress");
const pg = require('pg');
require('dotenv').config({ path: ".env.local" })

module.exports = defineConfig({
  projectId: 'etb4cb',
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
  },
  env: {
    auth0_username: process.env.AUTH0_USERNAME,
    auth0_password: process.env.AUTH0_PASSWORD,
    auth0_domain: process.env.REACT_APP_AUTH0_DOMAIN,
  },
});
  