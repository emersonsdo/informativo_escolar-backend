const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nome: String,
    cpf: String,
    dependentes: [{
        nome: String,
        matricula: String,
        data_nascimento: {type: Date, default: Date.now},
        serie: {type: Number, min:0, max: 6}
    }]
    
})