import { faker } from '@faker-js/faker';

describe('Testar para o endpoint de usuários', () => {
    
    it('Deve listar todos os usuários', () => {
        cy.api('GET', '/usuarios').should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('usuarios');
        });
    });

    it('Deve criar um novo usuário', () => {
        const usuario = {
            nome: faker.person.fullName(), 
            email: faker.internet.email(), 
            password: faker.internet.password(), 
            administrador: 'false', 
        };

        cy.api('POST', '/usuarios', usuario).should((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('_id');
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        });
    })

    it.skip('Buscar usuário pelo ID', () => {
    })
})