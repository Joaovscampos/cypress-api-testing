import {faker} from '@faker-js/faker';


describe('Testar para o endpoint de usuários', () => {
    
    it('Deve listar todos os usuários', () => {
        cy.api('GET', '/usuarios').should((response) => {
            expect(response.status).to.eql(200)
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
            expect(response.status).to.eql(201);
            expect(response.body).to.have.property('_id');
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        });
    });

    it('Buscar usuário pelo ID', () => {
        cy.api('GET', '/usuarios').then((response) => {
            const id = response.body.usuarios[0]._id;
            cy.api('GET', `/usuarios/${id}`).should((response) => {
                expect(response.status).to.eql(200);
                expect(response.body).to.have.property('_id', id);
            });
        });
    });

    it('Excluir um usuário', () => {
        cy.api('GET', '/usuarios').then((response) => {
            const id = response.body.usuarios[0]._id;
            cy.api('DELETE', `/usuarios/${id}`).should((response) => {
                expect(response.status).to.eql(200);
                expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
            });
        });
    });

    it('Editar Usuário', () => {
        cy.api('GET', '/usuarios').then((response) =>{
            const id = response.body.usuarios[0]._id;
            const usuario = {
                nome: faker.person.fullName(), 
                email: faker.internet.email(), 
                password: faker.internet.password(), 
                administrador: 'false', 
            };
            cy.api('PUT', `/usuarios/${id}`, usuario).should((response) => {
                expect(response.status).to.eql(200);
                expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
            });
        }); 
    });
});

