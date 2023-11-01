describe('We will make a connection with Postgres', () => {
  it('First connection', () => {
      cy.task("connectDB","SELECT NOW()").then(cy.log)
    })
})