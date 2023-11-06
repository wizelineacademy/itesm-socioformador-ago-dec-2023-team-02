
describe('We will make a connection with Postgres', () => {
  it('First connection', () => {
     cy.task("READFROMDB", {
      dbConfig: Cypress.config('DB'),
      sql: 'select * from "Message"'
     }).then((result)=>{
      console.log(result.rows)
     })
    })
})