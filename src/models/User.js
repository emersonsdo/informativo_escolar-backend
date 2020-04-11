const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nome: String,
    cpf: String,
    email: String,
    pin: {type: Number, min: 0, max: 9999},
    dependentes: [{
        nome: String,
        matricula: String,
        data_nascimento: {type: Date, default: Date.now},
        serie: {type: Number, min: 0, max: 6}
    }],
    ativo: {type: Boolean, default: true},
    criado_em: {type: Date, default: Date.now}
});

// module.exports = mongoose.model('User', UserSchema);