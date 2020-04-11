const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

//req.body = acessar corpo da requisição
routes.post('/users', UserController.store);

//req.query = acessar query_params
routes.get('/users', function (req, res) {
    return res.json({idade: req.query.idade});
});

//req.params = acessar route_params
routes.put('/users/:id', function (req, res) {
    return res.json({id: req.params.id});
});

routes.delete('/users/:id', function (req, res) {
    return res.json({id: req.params.id});
});

module.exports = routes;