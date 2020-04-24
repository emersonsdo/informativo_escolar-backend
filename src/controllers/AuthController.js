const User = require('../models/User');
const crypto = require('crypto');

module.exports = {
    async auth(req, res) {
        return res.status(204).json();
    }
}