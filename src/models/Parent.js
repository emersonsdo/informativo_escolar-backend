const mongoose = require('mongoose');
//mongoose.set('parentCreateIndex', true);

const ParentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Nome do responsável deve ser preenchido'
    },
    cpf: {
        type: String,
        required: 'CPF do responsável deve ser preenchido',
        unique: true
    },
    email: String,
    phone: String,
    pin: {type: Number, min: 0, max: 9999},
    dependents: [{
        name: {
            type: String,
            required: 'Nome do(a) dependente deve ser preenchido'
        },
        register_number: {
            type: String,
            required: 'Número da matrícula do(a) dependente deve ser preenchido',
            unique: true
        },
        birth_date: {
            type: Date, 
            default: Date.now,
            required: 'Data de nascimento do(a) dependente deve ser preenchida'
        },
        grade: {
            type: Number, 
            min: 0, 
            max: 6,
            required: 'A série atual do(a) dependente deve ser preenchido'
        }
    }],
    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Parent', ParentSchema);