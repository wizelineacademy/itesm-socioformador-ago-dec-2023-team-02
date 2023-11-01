const { defineConfig } = require("cypress");
const {Client} = require('pg');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query){
          const client = new Client({
      
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
