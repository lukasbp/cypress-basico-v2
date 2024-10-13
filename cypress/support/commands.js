Cypress.Commands.add('FillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Belinelli')
    cy.get('#email').type('darksleepo@gmail.com')
    cy.get('#open-text-area').type('test')
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')
})