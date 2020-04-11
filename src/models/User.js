const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    cpf: String,
    email: String,
    pin: {type: Number, min: 0, max: 9999},
    dependents: [{
        name: String,
        register_number: String,
        birth_date: {type: Date, default: Date.now},
        grade: {type: Number, min: 0, max: 6}
    }],
    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now}
});

// module.exports = mongoose.model('User', UserSchema);