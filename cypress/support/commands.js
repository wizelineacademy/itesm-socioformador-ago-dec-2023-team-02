Cypress.Commands.add('login', (username, password) => {
  const args = { username, password }
    cy.session(args, ()=>{
      cy.origin('https://wize-prompt.us.auth0.com', { args }, ({ username, password }) => {
        cy.get('input#username').type(username)
        cy.get('input#password').type(password, { log: false })
        cy.get('button').contains('Login').click()
      })
      cy.url().should('contain', '/home')
    },
    {
      validate() {
        cy.request('/api/user').its('status').should('eq', 200)
      },
    })
})
