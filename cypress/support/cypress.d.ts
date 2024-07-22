/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      login(userName: string, password: string): Chainable<void>;
    }
  }
  