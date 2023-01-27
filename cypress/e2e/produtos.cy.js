/*/// <reference types="cypress" />
import contrato from '../contratos/produtos.contract'

describe('Testes de Funcionalidade Produtos', () => {
   let token
   
    before (() => {
        cy.token('beltrano@qa.com.br', 'teste2').then(tkn => { token = tkn})
   });
   
   it.only('Deve validar contrato de produtos', () => {
        cy.request('produtos').then (response => {
            return contrato.validateAsync(response.body)
        })
   });

   //função correta
   it('Listar Produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).then((response) =>{
            expect(response.body.produtos[4].nome).to.equal('Produto EBAC 861031634224176')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(40)
        })

    });

    //função correta
    it('Cadastrar Produto', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 1000000000000000)}` 
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": produto,
                "preco": 470,
                "descricao": "Teclado",
                "quantidade": 381
              },
              headers: {authorization: token}

        }).then((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
        
        
    });

    //função correta
    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
       cy.cadastrarProduto(token, "Novo Produto 5", 250, "descrição do produto", 180).then((response) =>{
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe produto com esse nome')
        })
    });

    // correto
    it('Deve editar um produto já cadastrado', () => {
        cy.request('produtos').then( response => {
            let id = response.body.produtos[0]._id
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: {authorization: token},
                body: 
                {
                    "nome": "Iphone Xrr4",
                    "preco": 470,
                    "descricao": "telefone Celular EDITADO",
                    "quantidade": 381
                  }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    });

    // correto
    it('Deve editar um produto cadastrado previamente', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 1000000000000000)}`
        cy.cadastrarProduto(token, produto, 250, "descrição do produto", 180)
        .then (response => {
            let id = response.body._id
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: {authorization: token},
                body: 
                {
                    "nome": produto,
                    "preco": 370,
                    "descricao": "telefone Celular EDITADO 2",
                    "quantidade": 3381
                  }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    });

    //correto    
    it('Deve deletar um produto previamente cadastrado', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 1000000000000000)}`
        cy.cadastrarProduto(token, produto, 250, "descrição do produto", 180)
        .then (response => {
            let id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: {authorization: token}
            }).then (response => {
                expect(response.body.message).to.equal ('Registro excluído com sucesso')
                expect (response.status).to.equal(200)
            })

        })
    });

});*/