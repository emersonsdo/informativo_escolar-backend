const User = require('../models/User');
const moment = require('moment');
const crypto = require('crypto');

module.exports = {

    async store(req, res) {

        const { first_name, last_name, email, password, phone, permission_level } = req.body;

        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
        const encriptedPassword = salt + '$' + hash;
        
       let user = await User.find({ email });
        console.log(`Usuário: ${user}`);

        if(user){
            return res.status(422).json({ error: `Usuário com e-mail ${email} já cadastrado!` });
        }

        user = await User.create({
            first_name,
            last_name,
            email,
            password: encriptedPassword,
            phone,
            permission_level,
        });

        return res.status(201).json(user);
    },

    async index(req, res){
        return res.status(204).json();
    },

    async getById(req, res){
        return res.status(204).json();
    },

    async update(req, res){
        return res.status(204).json();
    },

    async removeById(req, res){
        return res.status(204).json();
    }
}