const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Config = require('../Config');


module.exports = {
    async auth(req, res) {
        const user = await User.find({ email: req.body.email });

        if(!user){
            return res.status(401).json({Erro: "Usuário ou senha inválidos"});
        }

        const passwordFields = user[0].password.split('$');
        const salt = passwordFields[0];
        const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");

        if(hash !== passwordFields[1]){
            return res.status(401).send({Erro: "Usuário ou senha inválidos"});
        }

        req.body = {
            user_id: user[0]._id,
            email: user[0].email,
            permission_level: user[0].permission_level,
            name: user[0].first_name + ' ' + user[0].last_name,
        };

        try {
            const jwtSecret = Config.jwtSecret;

            let refreshId = user[0]._id + jwtSecret;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body.refreshKey = salt;
            req.body.password = '********'

            let token = jwt.sign(req.body, jwtSecret);

            let b = new Buffer(hash);
            let refresh_token = b.toString('base64');
            return res.status(201).json({accessToken: token, refreshToken: refresh_token});
        } catch (error) {
            return res.status(500).json({errors: error});
        }
    }
}


