/// <reference types="cypress" />

var faker = require('faker');

import contrato from '../contratos/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token

     let usuarioNome = faker.name.firstName()
     let usuarioEmail = faker.internet.email(usuarioNome)
     let senha = "teste1234"

     before(() => {
          cy.token('beltrano@qa.com.br', 'teste2').then(tkn => { token = tkn })
     });

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then (response => {
               return contrato.validateAsync(response.body)
           })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(40)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let usuarioNome = faker.name.firstName()
          let usuarioEmail = faker.internet.email(usuarioNome)
          let senha = "teste1234"

          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": usuarioNome,
                    "email": usuarioEmail,
                    "password": senha,
                    "administrador": 'true'
               },
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });
  
     it('Deve validar um usuário com email inválido', () => {
          let usuarioNome = faker.name.firstName()
          let usuarioEmail = faker.internet.email(usuarioNome)
          let senha = "teste1234"

          cy.cadastrarUsuario(usuarioNome, usuarioEmail, senha, 'true').then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })

          cy.cadastrarUsuario(usuarioNome, usuarioEmail, senha, 'true').then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
         cy.cadastrarUsuario(usuarioNome, usuarioEmail, senha, 'true').then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,
                         body:
                         {
                              "nome": usuarioNome,
                              "email": usuarioEmail,
                              "password": "editada123",
                              "administrador": 'false'
                         }
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro alterado com sucesso')
                    })
               })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let usuarioNome = faker.name.firstName()
          let usuarioEmail = faker.internet.email(usuarioNome)
          let senha = "teste1234"

          cy.cadastrarUsuario(usuarioNome, usuarioEmail, senha, 'true').then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          }).then(response => {
               let id = response.body._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`
               }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                    expect(response.status).to.equal(200)
               })

          })


     });


});
