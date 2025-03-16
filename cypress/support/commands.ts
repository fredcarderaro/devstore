/// <reference types="cypress" />

// -- This is a parent command --
declare namespace Cypress {
  interface Chainable {
    searchByQuery(query: string): Chainable<void>
  }
}

// Add command searchByQuery
Cypress.Commands.add('searchByQuery', (query: string) => {
  cy.visit('/')

  cy.get('input[name=q]').type(query).parent('form').submit()
})
