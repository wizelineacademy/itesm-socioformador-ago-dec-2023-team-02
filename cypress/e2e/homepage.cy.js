describe('Homepage', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains("Get Started").click()
  })
})