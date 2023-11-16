/// <reference types="cypress" />

context('Conversation test', ()=> {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2500)
})
/*
it ('intereption of GET requests', () => {
  cy.intercept('GET', '**conversation/*').as('getMessage')
  cy.wait('@getMessage').its('response.statusCode').should('eq', 200)
})*/

it ('Input data to make a prompt', () => {
  cy.get('[placeholder="Send Message"]').type("2+2, do not use words")
  cy.get('.flex-1.text-inherit.font-normal.px-1').should('contain', '8')
  cy.get('[type="submit"]').click()
  cy.contains('2+2, do not use words')
  cy.wait(4500)
  cy.contains('4')
})

})