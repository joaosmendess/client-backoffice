// cypress/support/commands.js
Cypress.Commands.add('login', (userName, password, redirectTo) => {
    cy.visit(`http://localhost:5175/login?redirect_to=${encodeURIComponent(redirectTo)}`);
  
    cy.get('#userName').type(userName);
    cy.get('#password').type(password);
    cy.get('#loginButton').click();
  
    // Verifique se o redirecionamento ocorreu com sucesso
    cy.url().should('include', redirectTo);
  });
  