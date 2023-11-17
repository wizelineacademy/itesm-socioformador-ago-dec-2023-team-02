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

it ("Create new chat Dalle model", ()=> {
  cy.contains("New Chat").click()
  cy.get('[placeholder="Chat name"]').type("test Dalle model")
  cy.contains('Select a Model').click()
  cy.contains('DALLE').click()
  cy.get('[id="add-tag"]').click()
  cy.contains('test').click()
  cy.contains('Confirm').click()
  cy.contains('No chosen tags').should('not.exist')
  cy.contains('Create').click()
  cy.contains('test Dalle model')
})

it ("Conversation in Dalle model", ()=>{
  cy.contains("Size").click()
  cy.contains("512x512").click()
  cy.contains("Save").click()
  cy.get('[placeholder="Send Message"]').type("small dog")
  cy.get('[id="token-count"]').should('contain', '2' )
  cy.get('[id="submit"]').click()
  cy.contains('small dog')
  cy.wait(4500)
  cy.contains('https://wizeprompt.s3.us-east-1.amazonaws.com')
})

it("Delete chat", ()=>{ //revisar
  cy.get('[id="react-aria2947031831-:r8o:"]').click()  
  cy.contains("delete").click()
  cy.contains("test Dalle model").should("not.exist")
})

})