const { defineConfig } = require("cypress");
const {Client} = require('pg');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(){
          const client = new Client({
            user: "equiposam",
            password: "equiposam",
            host: "ls-92ab26ead039cd8076ca151fd065fa2cd83161f0.cbksars5o389.us-east-1.rds.amazonaws.com ",
            database: "postgress",
            ssl: false,
            port: 5432
          })
          await client.connect()
          const res = await client.query('SELECT NOW()')
          await client.end()
          return res.rows;
        }
      })
    },
  },
});
