import express from 'express';
import knex from './database/connection';

const routes = express.Router();

// Foi utilizado o método GET, pois é através dele que os dados são retornados
// Listar usuários
routes.get('/users', async (request, response) => {
    const users = await knex('users').select('*');

    return response.json(users);
});

// Foi utilizado o método GET, pois é através dele que os dados do usuário (passado como parâmetro na rota) são retornados
// Listar um usuário
routes.get('/users/:id', async (request, response) => {
    const { id } = request.params;

    const user = await knex('users').where('id', id).first();

    return response.json(user);
});

// Foi utilizado o método POST, pois é através dele que é possível registrar informações no banco
// Inserir um usuário
routes.post('/users', async (request, response) => {
    const { name, email, phone } = request.body;

    await knex('users').insert({
        name,
        email,
        phone,
    });

    return response.json({ success: true });
});

// Foi utilizado o método PUT, pois é através dele que é possível atualizar informações no banco. 
// Sendo o método PUT responsável por atualizar todos os dados de uma vez, diferente do PATCH que é
// utilizado para atualizar apenas uma informação específica
// Atualizar um usuário
routes.put('/users/:id', async (request, response) => {
    const { id } = request.params;
    const { name, email, phone } = request.body;

    await knex('users').where('id', id).update({
        name,
        email,
        phone,
    });

    return response.json({ success: true });
});

// Foi utilizado o método DELETE, pois é através dele que é possível deletar informações do banco
// Deletar um usuário
routes.delete('/users/:id', async (request, response) => {
    const { id } = request.params;

    await knex('users').where('id', id).delete();

    return response.json({ success: true });
});

export default routes;