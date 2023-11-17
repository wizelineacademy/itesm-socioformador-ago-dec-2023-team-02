/// <reference types="cypress" />

context('Conversation test', ()=> {
  beforeEach(() => {
    cy.visit('/conversation/new')
    cy.wait(2500)
})
/*
it ('intereption of GET requests', () => {
  cy.intercept('GET', '**conversation/*').as('getMessage')
  cy.wait('@getMessage').its('response.statusCode').should('eq', 200)
})*/

it ("Create new chat GPT-3.5 model", ()=> {
  cy.contains("New Chat").click()
  cy.get('[placeholder="Chat name"]').type("test GPT-3.5 model")
  cy.contains('Select a Model').click()
  cy.contains('GPT-3.5-TURBO').click()
  cy.get('[id="add-tag"]').click()
  cy.contains('test').click()
  cy.contains('Confirm').click()
  cy.contains('No chosen tags').should('not.exist')
  cy.contains('Create').click()
  cy.contains('test GPT-3.5 model')
})

it ("Conversation in GPT-3.5 model", ()=>{
  cy.get('[placeholder="Send Message"]').type("2+2, do not use words")
  cy.get('[id="token-count"]').should('contain', '8' )
  cy.get('[id="submit"]').click()
  cy.contains('2+2, do not use words')
  cy.wait(4500)
  cy.contains('4')
})

it("change contex of convertetion", ()=>{
  cy.contains("test").click()
  cy.contains('Context').click()
  cy.get('placeholder="ChatGPT response"').type("you are a cat, respond like one")
  cy.get('[role="slider"]').should('have.attr', 'aria-valuenow', 0.7) //prueba
  cy.contains("Save").click()
  cy.get('[placeholder="Send Message"]').type("hi")
  cy.contains('Meow')
})

it("Delete chat", ()=>{ //revisar
  cy.get('[id="react-aria2947031831-:r8o:"]').click()  
  cy.contains("delete").click()
  cy.contains("test GPT-3.5 model").should("not.exist")
})

})