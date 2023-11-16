const { contains } = require("cypress/types/jquery")
const { not } = require("git-cz")

context('Sidebar test', ()=> {
  beforeEach(() => {
    cy.visit('/conversation/new')
})

it("Search chat test", ()=>{
  cy.get('[placeholder="Search Chat"]').type("tests")
  cy.get('[placeholder="Search Chat"]').should('eq', 'tests')
  cy.contains("tests")
  cy.contains("Dalle Test 2")
  cy.contains("Programación").should('not.exist')
  cy.get('[data-slot="clear-button"]').click()
  cy.get('[placeholder="Search Chat"]').should('eq', '')
}) 

it("Create new tag", ()=>{
  cy.get('[id="tag-button"]').click()
  cy.contains('Edit tags').click()
  cy.contains("New tag +").click()
  cy.get('[id="react-aria2251614062-:r12v:"]').type("Test 2")
  cy.get('[style="height: 12px; background: rgb(210, 121, 121); cursor: pointer;""]').click()
  cy.contains("Save").click()
  cy.contains("Test 2")
})

it("Search tag test ", ()=>{
  cy.get('[id="tag-button"]').click()
  cy.get('[placeholder="Search tags"]').type("test")
  cy.contains("test").click()
  cy.contains("Close").click()
  cy.contains("Programación").should('not.exist')
})

it("Delete tag test ", ()=>{
  cy.get('[id="tag-button"]').click()
  cy.contains("Edit tags").click()
  cy.get('[id="tag-edit"').click() //tag-display
  cy.get('[id="tag-delete"]').click
  cy.contains("test").should("not.exist")
  
})

it("Rename chat test", ()=>{
  cy.get('[id="id="react-aria2947031831-:r8o:"]').click()
  cy.contains("Rename").click()
  cy.get('[d="react-aria8160225660-:r9q:"]').type("test 1")
  cy.get('[d="M416 128L192 384l-96-96"]').click()
  cy.contains("test 1")
})

it("Change tags in a convertation", ()=>{
  cy.get('[id="id="react-aria2947031831-:r8o:"]').click()
  cy.contains("Edit Tags").click()
  cy.contains("Programación").click()
  cy.contains("Close").click()
})

it("Delete chat", ()=>{
  cy.get('[id="id="react-aria2947031831-:r8o:"]').click()
  cy.contains("delete").click()
  cy.contains("tests").should("not.exist")
})

})

//xmlns="http://www.w3.org/2000/svg"