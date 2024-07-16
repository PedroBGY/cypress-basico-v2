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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome, sobrenome, email, telefone, textarea) =>{
    cy.get("input[name='firstName']").should("be.visible").type(nome)
    cy.get("input[name='lastName']").should("be.visible").type(sobrenome)
    cy.get("input[id='email']").should("be.visible").type(email)
    cy.get("input[id='phone']").should("be.visible").type(telefone, {delay:100})
    cy.get("textarea[id='open-text-area']").should("be.visible").type(textarea)
    cy.get("button[type='submit']").should("be.visible").click()
})

