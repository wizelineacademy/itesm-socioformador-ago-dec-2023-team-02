describe('Homepage', () => {
  it('passes', () => {
   /* cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )*/
    cy.visit("/")
    cy.contains("Get Started").click()
    cy.wait(6000)
    cy.origin("https://wize-prompt.us.auth0.com", ()=>{
      cy.contains("Welcome")
    })

  })
})