const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');


module.exports = {
    async auth(req, res) {

        if(!req.headers['authorization'] || req.headers['authorization'].split(' ').length != 2){
            return res.status(400).send({message: "Requisição inválida"});
        }
 
        const authType = req.headers['authorization'].split(' ')[0];
        if(authType !== 'Basic') {
            return res.status(400).send({message: "Requisição inválida"});
        }

        const authFieldsBase64 = req.headers['authorization'].split(' ')[1];
        const base64Buffer = Buffer.from(authFieldsBase64, 'base64');
        const authFields = base64Buffer.toString('ascii').split(':');

        if(!authFields || authFields.length != 2){
            return res.status(400).send({message: "Requisição inválida"});
        }

        const email = authFields[0];
        const password = authFields[1];

        const user = await User.find({ email });

        if(user.length === 0){
            return res.status(401).json({message: "Usuário ou senha inválidos"});
        }

        const passwordFields = user[0].password.split('$');
        const salt = passwordFields[0];
        const hash = crypto.createHmac('sha512', salt).update(password).digest("base64");

        if(hash !== passwordFields[1]){
            return res.status(401).send({message: "Usuário ou senha inválidos"});
        }

        req.body = {
            user_id: user[0]._id,
            email: user[0].email,
            permission_level: user[0].permission_level,
            name: user[0].first_name + ' ' + user[0].last_name,
        };

        try {
            let refreshId = user[0]._id + jwtSecret;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body.refreshKey = salt;
            req.body.password = '********'

            let token = jwt.sign(req.body, jwtSecret);

            let b = new Buffer(hash);
            let refresh_token = b.toString('base64');
             
            res.status(201).json({accessToken: token, refreshToken: refresh_token});
            return res;
        } catch (error) {
            return res.status(500).json({message: error});
        }
    }
}


