const User = require('../models/User');
const moment = require('moment');
const crypto = require('crypto');
const mongoose = require('mongoose');


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

        let user;
        try {
            user = await User.findById(req.params.id);
        } catch (error) {
            if(error instanceof mongoose.Error.CastError) {
                return res.status(422).json({erro: "Parâmetro em formato inválido!"});
            }

            return res.status(500).json({erro: "Erro no processamento da requisição"})
        } 
           
        if(!user){
            return res.status(404).json({erro: "Usuário inexistente"});
        }

        return res.status(200).json(user);
    },

    async update(req, res){

        let wasModified = false;
        let user;
        try {
            user = await User.findById(req.params.id);
        } catch (error) {
            if(error instanceof mongoose.Error.CastError) {
                return res.status(422).json({erro: "Parâmetro em formato inválido!"});
            }
            return res.status(500).json({erro: "Erro no processamento da requisição"});
        } 
           
        if(!user){
            return res.status(404).json({erro: "Usuário inexistente"});
        }

        const { first_name, last_name, password, permission_level} = req.body;
        if (first_name) { user.first_name = first_name; wasModified = true; }
        if (last_name) {user.last_name = last_name; wasModified = true;}
        if (permission_level) {user.permission_level = permission_level; wasModified = true;}
        if (password) {
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
            const encriptedPassword = salt + '$' + hash;
            user.password = encriptedPassword;
            wasModified = true;
        }

        if(wasModified){
            user.updated_at = Date.now;
        }

        user.save();
        return res.status(201).json(user._id);
    },

    async removeById(req, res){
        return res.status(204).json();
    }
}