//store, index (quais tipos de filtros serão oferecidos?), show, update, destroy
const moment = require('moment');

module.exports = {

    store(req, res) {
        const { name } = req.body;
        const { cpf }  = req.body;
        const { email } = req.body;
        const { pin } = req.body;
        const { dependents } = req.body;

        console.log(`Nome: ${name} \n CPF: ${cpf} \n E-mail: ${email} \n Pin: ${pin} \n`);

        console.log('Dados do(s) dependente(s): \n');
        Object.keys(dependents).forEach(function(key) {
            // var birth_date = moment(dependents[key].birth_date, "DD-M-YYYY");
            console.log(`Nome: ${dependents[key].name}
            Matrícula: ${dependents[key].register_number} 
            Data de nascimento: ${dependents[key].birth_date}
            Série: ${dependents[key].grade}`);
        });

        return res.json({name: `${name}`});
    }

}