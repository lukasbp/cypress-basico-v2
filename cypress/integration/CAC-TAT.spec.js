describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    });

    it('Verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Sou dollynho seu amiguinhoSou dollynho seu amiguinhoSou dollynho seu amiguinhoSou dollynho seu amiguinhoSou dollynho seu amiguinhoSou dollynho seu amiguinho'

        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Belinelli')
        cy.get('#email').type('darksleepo@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('Mensagem de erro ao submeter e-mail inválido', () => {

        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Belinelli')
        cy.get('#email').type('darksleepo.com')
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    });

    it('Campo telefone continua vazio quando preenchido com valor inválido', () => {
        cy.get('#phone')
            .type('teste')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Belinelli')
        cy.get('#email').type('darksleepo@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName')
            .type('Lucas')
            .should('have.value', 'Lucas')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Belinelli')
            .should('have.value', 'Belinelli')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('darksleepo@gmail.com')
            .should('have.value', 'darksleepo@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('test')
            .should('have.value', 'test')
            .clear()
            .should('have.value', '')
    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('Usando function para preencher campos e submeter formulário', () => {
        cy.FillMandatoryFieldsAndSubmit()
    });

    it('Utilizando contains para validar campos', () => {
        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Belinelli')
        cy.get('#email').type('darksleepo@gmail.com')
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()
    });

    it('Seleciona um produto Youtube por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('Seleciona um produto(Mentoria) por seu valor(value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto(Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            }

            )
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('example')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@example')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy  a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy  a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    });
});


