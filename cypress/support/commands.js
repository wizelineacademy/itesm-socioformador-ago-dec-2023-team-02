// cypress/support/auth-provider-commands/auth0.ts

function loginViaAuth0Ui(username, password) {
    // App landing page redirects to Auth0.
    cy.visit('/')
  
    // Login on Auth0.
    const sentArg = { username, password}
    cy.origin('https://wize-prompt.us.auth0.com', () => {
        cy.contains('button[value=default]', 'Continue').click()
      })
  
    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('equal', 'http://localhost:3000/')
  }
  
  Cypress.Commands.add('loginToAuth0', (username, password) => {
    const log = Cypress.log({
      displayName: 'AUTH0 LOGIN',
      message: [`🔐 Authenticating | ${username}`],
      // @ts-ignore
      autoEnd: false,
    })
    log.snapshot('before')
  
    cy.session(
      `auth0-${username}`,
      () => {
        loginViaAuth0Ui(username, password)
      },
      {
        validate: () => {
          // Validate presence of access token in localStorage.
          cy.wrap(localStorage)
            .invoke('getItem', 'authAccessToken')
            .should('exist')
        },
      }
    )
  
    log.snapshot('after')
    log.end()
  })