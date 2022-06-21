// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Franco de Oliveira')
    cy.get('#email').type('pedrooliveira@tokenlab.com.br')
    cy.get('#phone').type('996541844')
    cy.get('#open-text-area').type('Eu gostaria de solicitar ajuda do suporte TAT - bla bla bla bla bla', {delay:0})
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
})
