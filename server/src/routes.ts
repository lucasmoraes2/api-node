import express from 'express';
import knex from './database/connection';

const routes = express.Router();

// Listar usuários
routes.get('/users', async (request, response) => {
    const users = await knex('users').select('*');

    return response.json(users);
});

// Listar um usuário
routes.get('/users/:id', async (request, response) => {
    const { id } = request.params;

    const user = await knex('users').where('id', id).first();

    return response.json(user);
});

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

// Atualizar um usuário
routes.patch('/users/:id', async (request, response) => {
    const { id } = request.params;
    const { name, email, phone } = request.body;

    await knex('users').where('id', id).update({
        name,
        email,
        phone,
    });

    return response.json({ success: true });
});

// Deletar um usuário
routes.delete('/users/:id', async (request, response) => {
    const { id } = request.params;

    await knex('users').where('id', id).delete();

    return response.json({ success: true });
});

export default routes;