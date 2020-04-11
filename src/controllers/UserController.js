//store, index (quais tipos de filtros serão oferecidos?), show, update, destroy
const moment = require('moment');

module.exports = {

    store(req, res) {
        const { name } = req.body;

        return res.json({message: 'Hello Wolrd'});
    }

};