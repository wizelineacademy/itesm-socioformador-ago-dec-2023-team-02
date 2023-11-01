const { defineConfig } = require("cypress");
const {Client} = require('pg');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query){
          const client = new Client({
            user: "william-monroy",
            password: "FE90vBORUCgp",
            host: "ep-broken-salad-00817204.us-east-2.aws.neon.tech",
            database: "neondb",
            ssl: true,
            port: 5432
          })
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows;
        }
      })
    },
  },
});
