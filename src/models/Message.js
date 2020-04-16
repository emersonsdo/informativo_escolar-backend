const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: 'O título não pode ser vazio'
    },
    content: {
        type: String,
        required: 'O conteúdo da mensagem não pode ser vazio'
    },
    grade: {
        type: Number, 
        min: 0,
        max: 6,
        required: 'A série do aluno deve ser preenchida'
    },
    send_date: {
        type: Date,
        default: Date.now
    },
    summary: String,
    alreadRead: Boolean,
    image_link: String
});

module.exports = mongoose.model('Message', UserSchema);