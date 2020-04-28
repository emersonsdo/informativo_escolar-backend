const BodyParser = require('body-parser'); 
const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Config');

exports.authenticate = (req, res, next) => {
    console.log(`Na autenticação. HEADER: ${req.headers['authorization']}`);
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).json({message: 'Tipo de autenticação não suportada'});
            } else {
                req.jwt = jwt.verify(authorization[1], jwtConfig);
                return next();
            }
        } catch (err) {
            return res.status(500).json({error: 'Ocorreu um erro durante o processo de autenticação'});
        }
    } else {
        return res.status(401).json({message: 'Credenciais inválidas'});
    }
}; 

exports.hasAuthorization = (required_permission_level) => {
    console.log(`Na autorização. Permission Required: ${required_permission_level}`);
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.permission_level);

        console.log(`Nível de permissão do usuário: ${user_permission_level}`);
        console.log(`user_permission_level & required_permission_level: ${user_permission_level & required_permission_level}`);

        if (user_permission_level & required_permission_level || user_permission_level === 0) {
            return next();
        } else {
            return res.status(403).json({message: 'Usuário não tem permissão para essa ação'});
        }
    };
 };

