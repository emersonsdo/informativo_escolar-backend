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
    alread_read: {
        type: Boolean,
        default: false
    },
    image_link: String,
    created_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema);