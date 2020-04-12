//store, index (quais tipos de filtros serão oferecidos?), show, update, destroy
const moment = require('moment');
const User = require('../models/User');

module.exports = {

    async store(req, res) {
        const { name } = req.body;
        const { cpf }  = req.body;
        const { email } = req.body;
        const { pin } = req.body;
        const { dependents } = req.body;
        const active = true;
        const created_at = moment.now();

        const user = await User({
            name,
            cpf,
            email,
            pin,
            dependents,
            active,
            created_at
        });

        /*console.log(`Nome: ${name} \n CPF: ${cpf} \n E-mail: ${email} \n Pin: ${pin} \n`);
        console.log('Dados do(s) dependente(s): \n');
        Object.keys(dependents).forEach(function(key) {
            var birth_date = moment(dependents[key].birth_date, 'DD/MM/YYYY');
            var day = birth_date.format('DD');
            var month = birth_date.format('MM');
            var year = birth_date.format('YYYY');
            console.log(`Nome: ${dependents[key].name}
            Matrícula: ${dependents[key].register_number} 
            Data de nascimento: ${dependents[key].birth_date}
            Dia de nascimento: ${day}
            Mês de nascimento: ${month}
            Ano de nascimento: ${year}
            Série: ${dependents[key].grade}`);

            
        });*/

        return res.json(user);
    }

}