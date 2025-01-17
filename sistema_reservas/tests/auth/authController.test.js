const request = require('supertest');
const app = require('../../app'); // Certifique-se de exportar o app no arquivo `app.js`

describe('Testes de Autenticação', () => {
  it('Deve registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/usuarios/registrar')
      .send({
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: 'senha123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuário registrado com sucesso.');
  });

  it('Deve retornar erro ao registrar com e-mail duplicado', async () => {
    await request(app).post('/usuarios/registrar').send({
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: 'senha123',
    });

    const response = await request(app).post('/usuarios/registrar').send({
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: 'senha123',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'E-mail já está em uso.');
  });
});

it('Deve realizar login com sucesso', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({
        email: 'teste@teste.com',
        senha: 'senha123',
      });
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
  