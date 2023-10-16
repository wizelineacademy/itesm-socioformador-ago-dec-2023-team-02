describe('Homepage', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/') 
    cy.get(' .text-2xl').contains('WizePrompt')
    cy.get(' .p-1').contains('Users Message')
  })
})