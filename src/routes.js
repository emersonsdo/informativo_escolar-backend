const express = require('express');
const UserController = require('./controllers/UserController');
const ParentController = require('./controllers/ParentController');
const MessageController = require('./controllers/MessageController');

const routes = express.Router();

routes.post('/users', UserController.store);

routes.post('/parents', ParentController.store);
routes.get('/parents', ParentController.index);

routes.post('/messages', MessageController.store);


//req.body = acessar corpo da requisição
//req.query = acessar query_params
routes.get('/users', function (req, res) {
    return res.send('Hello World');
    // return res.json({idade: req.query.idade});
});

//req.params = acessar route_params
routes.put('/users/:id', function (req, res) {
    return res.json({id: req.params.id});
});

routes.delete('/users/:id', function (req, res) {
    return res.json({id: req.params.id});
});

module.exports = routes;