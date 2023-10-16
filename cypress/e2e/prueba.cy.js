/// <reference types="cypress" />

context('buttons testing', ()=> {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
})

  it ('pagina pinciapal', () => {
    cy.get(' .text-2xl').contains('WizePrompt')
    cy.get(' .p-1').contains('Users Message')
  })

  it ('testing of the send message button', () => {

    cy.get(' .bg-textarea').type('hola mundo').should('have.value', 'hola mundo')
    cy.wait(500)
    cy.get(' .rounded-md').contains('Send message').click()
    cy.wait(500)
    cy.get(' .text-lg').contains('User')
  })

  it ('intereption of GET requests', () => {
    cy.intercept('GET', '**/conversation/*').as('getMessage')
    cy.wait('@getMessage').its('response.statusCode').should('eq', 500)
  })
})

