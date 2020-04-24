const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    first_name:  {
        type: String,
        required: 'Primeiro nome do usuário deve ser preenchido'
    },

    last_name: String,

    email:  {
        type: String,
        required: 'O e-mail do usuário deve ser preenchido'
    },

    password: {
        type: String,
        required: 'A senha do usuário deve ser preenchida'
    },

    phone: String,

    //0: tudo, 1: criar usuários, 2: enviar avisos, 3: cadastrar responsáveis, 4: 2 e 3
    permission_level: Number,

    created_at: {
        type: Date, 
        default: Date.now
    },

    updated_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);