/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(()=>{
        cy.visit("../src/index.html")
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('eq', "Central de Atendimento ao Cliente TAT")
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get("input[name='firstName']").should("be.visible").type("Teste123")
        cy.get("input[name='lastName']").should("be.visible").type("123456")
        cy.get("input[id='email']").should("be.visible").type("pedro@gmail.com")
        cy.get("input[id='phone']").should("be.visible").type("51982112345", {delay:100})
        cy.get("button[type='submit']").should("be.visible").click()
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get("input[name='firstName']").should("be.visible").type("Teste123")
        cy.get("input[name='lastName']").should("be.visible").type("123456")
        cy.get("input[id='email']").should("be.visible").type("pedrogmail.com")
        cy.get("input[id='phone']").should("be.visible").type("51982112345", {delay:100})
        cy.get("textarea[id='open-text-area']").should("be.visible").type("pedrogmail.com")
        cy.get("button[type='submit']").should("be.visible").click()
        
    })
    it('Validar campo númerico', function(){
        cy.get("input[id='phone']").should("be.visible").type("teste").then(()=>{
            cy.get("input[id='phone']").should("be.empty")
        })
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
        cy.get("input[name='firstName']").should("be.visible").type("Teste123")
        cy.get("input[name='lastName']").should("be.visible").type("123456")
        cy.get("input[id='email']").should("be.visible").type("pedro@gmail.com")
        cy.get("input[id='phone-checkbox']").should("be.visible").check()
        cy.get("textarea[id='open-text-area']").should("be.visible").type("pedro@gmail.com")
        cy.get("button[type='submit']").should("be.visible").click()
        cy.get("span[style='display: block;'].error").should("be.visible")
    })

    it('preenche os campos obrigatórios e limpa os dados', ()=> {
        cy.get("input[name='firstName']").should("be.visible").type("Teste123").should("have.value", "Teste123")
        cy.get("input[name='lastName']").should("be.visible").type("123456").should("have.value", "123456")
        cy.get("input[id='email']").should("be.visible").type("pedro@gmail.com").should("have.value", "pedro@gmail.com")
        cy.get("input[id='phone']").should("be.visible").type("51982112345", {delay:100}).should("have.value", "51982112345")
        
        cy.get("input[name='firstName']").should("be.visible").clear().should("have.value", "")
        cy.get("input[name='lastName']").should("be.visible").clear().should("have.value", "")
        cy.get("input[id='email']").should("be.visible").clear().should("have.value", "")
        cy.get("input[id='phone']").should("be.visible").clear().should("have.value", "")
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
        cy.get("button[type='submit']").should("be.visible").click()
        cy.get("span[style='display: block;'].error").should("be.visible")
    })
    it("envia o formuário com sucesso usando um comando customizado", ()=>{
        cy.fillMandatoryFieldsAndSubmit("Pedro", "Henrique", "pedro@gmail.com", "51982113234", "Testestestestesteste")
        //cy.get("span[style= 'display: block;'].success").should("be.visible")
        cy.contains("span[style= 'display: block;'].success strong", "Mensagem enviada com sucesso.")
    })

    it("seleciona um produto (YouTube) por seu texto", ()=>{
        cy.get("select[id='product']").select("YouTube").should('have.value', "youtube")
    })

    it("seleciona um produto (Mentoria) por seu valor (value)", ()=>{
        cy.get("select[id='product']").select('mentoria').should('have.value', 'mentoria')
    })
    it("seleciona um produto (Blog) por seu índice", ()=>{
        cy.get("select[id='product']").select(1).should('have.value', 'blog')
    })
    it("marca o tipo de atendimento 'Feedback'", ()=>{
        cy.get("input[value='feedback']").should("be.visible").check().should("be.checked")
    })

    it("marca cada tipo de atendimento", ()=>{
        cy.get("div[id='support-type'] input").each(($input, index, $inputs)=>{
            cy.wrap($input).check().should("be.checked")
        })
    })

    it("seleciona um arquivo da pasta fixtures", ()=>{
        cy.get("input[id='file-upload']").selectFile("cypress/fixtures/example.json").then((input)=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it("seleciona um arquivo simulando um drag-and-drop", ()=>{
        cy.get("input[id='file-upload']").selectFile("cypress/fixtures/example.json", {action: 'drag-drop'}).then((input)=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", ()=>{
        cy.fixture('example.json', { encoding:null }).as('exampleFile')
        cy.get("input[id='file-upload']").selectFile("@exampleFile").then((input)=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", ()=>{
        cy.get("div[id='privacy'] a").should("have.attr", "target","_blank")
    })

    it.only("acessa a página da política de privacidade removendo o target e então clicando no link", ()=>{
        cy.get("div[id='privacy'] a").invoke("removeAttr", "target").click()
        cy.contains("h1[id='title']", "CAC TAT - Política de privacidade")
    })





    
  })
