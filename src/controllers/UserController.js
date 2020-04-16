//store, index (quais tipos de filtros serão oferecidos?), show, update, destroy
const moment = require('moment');
const User = require('../models/User');
const validarCpf = require('validar-cpf');

module.exports = {

    async store(req, res) {
        const { name, cpf, email, pin, dependents } = req.body;
        const active = true;
        const created_at = moment.now();

        if(!validarCpf(cpf)){
            return res.status(422).json({ error: `CPF ${cpf} inválido!` });
        }

        let user = await User.findOne({ cpf });
        
        if(!user) {
            user = await User.create({
                name,
                cpf,
                email,
                pin,
                dependents,
                active,
                created_at
            });
        }

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
    },

    async index(req, res){
        const { grade } = req.query;

        const parents = await User.find({ 'dependents.grade': grade });

        return res.json(parents);
    }
}









