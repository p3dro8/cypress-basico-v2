/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', () => {
        cy.title().should('contains', 'Central de Atendimento ao Cliente TAT')               
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName')
            .type('Pedro')
            .should('have.value', 'Pedro')

        cy.get('#lastName')
            .type('Franco de Oliveira')
            .should('have.value', 'Franco de Oliveira')

        cy.get('#email')
            .type('pedrooliveira@tokenlab.com.br')
            .should('have.value', 'pedrooliveira@tokenlab.com.br')

        cy.get('#phone')
            .type('996541844')
            .should('have.value', '996541844')

        cy.get('#open-text-area')
            .type('Eu gostaria de solicitar ajuda do suporte TAT - bla bla bla bla bla', {delay:0})
            .should('have.value', 'Eu gostaria de solicitar ajuda do suporte TAT - bla bla bla bla bla')

        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Franco de Oliveira')
        cy.get('#email').type('pedrooliveira@tokenlab')
        cy.get('#phone').type('996541844')
        cy.get('#open-text-area').type('Eu gostaria de solicitar ajuda do suporte TAT - bla bla bla bla bla', {delay:0})
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('validar se o campo de telefone aceita somente números', () => {
        cy.get('#phone')
            .type('testando')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Franco de Oliveira')
        cy.get('#email').type('pedrooliveira@tokenlab.com.br')
        cy.get('#open-text-area').type('Eu gostaria de solicitar ajuda do suporte TAT - bla bla bla bla bla', {delay:0})
        cy.get('input[type="checkbox"]').check('phone')
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('preencher campos e submeter com command', () => {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('preencher formulário utilizando o contains', () => {
        cy.contains('Nome').type('Pedro')
        cy.contains('Sobrenome').type('Franco de Oliveira')
        cy.contains('E-mail').type('pedrooliveira@tokenlab.com.br')
        cy.contains('Telefone').type('996541844')
        cy.get('#open-text-area').type('Eu gostaria de solicitar ajuda do suporte TAT - bla bla bla bla bla', {delay:0})
        cy.contains('Enviar').click()
        cy.contains('Mensagem enviada com sucesso.').should('be.visible')

    })
    //UTILIZANDO SELECT
    
    //selecionando por value
    it('preenchendo select por value', () => {
        cy.get('#product')
        .select('blog')
        .should('have.value', 'blog')
    })
    
    //selecionando por texto
    it('preenchendo select por texto', () => {
        cy.get('#product')
        .select('Blog')
        .should('have.value', 'blog')
    })
    
    //selecionando por índice
    it('preenchendo select por índice', () => {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
})

describe('Radio', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    
    //UTILIZANDO RADIO
        //não dá por texto
    it('selecionando radio pelo value', () => {
        cy.get('#support-type input').check('feedback')
    })

        //é só o primeiro ou último, diferente disso tem que ir por value
    it('selecionando first radio', () => {
        cy.get('#support-type input')
            .first()
            .check()
            .should('be.checked')
    })

    it('marca cada tipo de atendimento no radio', () => {
        cy.get('#support-type input').each(($el) => {
            cy.wrap($el)
                .check()
                .should('be.checked')
        })
    })
})

describe('checkbox', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    
    //UTILIZANDO CHECKBOX
    it('marcando todos checkboxes, depois desmarcando', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .uncheck()
            .should('not.be.checked')            
    })

        //aqui é por value, não por texto
    it('marcando checkbox específico', () => {
        cy.get('input[type="checkbox"]')
            .check('phone')
            .check('phone')
            .should('be.checked')
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
})

//UPLOAD
describe('UPLOAD DE ARQUIVOS', () => {
    
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    //validação complicada
    it('upload de arquivos', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json').then($el => {
                expect($el[0].files[0].name).to.equal('example.json')
            })
    })

    //drag and drop
    it('upload de arquivos com drag and drop', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}).then($el => {
                expect($el[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile', {action: 'drag-drop'}).then($el => {
                expect($el[0].files[0].name).to.equal('example.json')
            })
    })
})

    //LINKS EM OUTRA ABA
describe('Links em outra aba', () => {
    
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    //removendo atributo target para abrir na mesma aba
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.viewport(410,860)
        cy.get('#privacy > a')
            .invoke('removeAttr', 'target')
            .click()
        cy.title().should('contain', 'Política de privacidade')             
    })
})

