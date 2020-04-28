//store, index (quais tipos de filtros serão oferecidos?), show, update, destroy
const moment = require('moment');
const Parent = require('../models/Parent');
const validarCpf = require('validar-cpf');

module.exports = {

    async store(req, res) {
        const { name, cpf, email, phone, pin, dependents } = req.body;
        const active = true;
        const created_at = moment.now();

        if(!validarCpf(cpf)){
            return res.status(422).json({ error: `CPF ${cpf} inválido!` });
        }

        let parent = await Parent.findOne({ cpf });
        
        if(!parent) {
            parent = await Parent.create({
                name,
                cpf,
                email,
                phone,
                pin,
                dependents,
                active,
                created_at
            });
        }
        
        return res.json(parent);
    },

    async index(req, res){
        const { grade } = req.query;

        const parents = await getParents(grade);
        console.log(`service: ${parents}`);

        return res.json(parents);
    },

    getParentsForGrade(grade) {
        return getParents(grade);
    }
}

async function getParents(grade) {

    let parents;
    if(!grade) {
        parents = await Parent.find({}, (err, parents) => {
            var parentMap = {};

            parents.forEach(function(parent){
                parentMap[parent._id] = parent;
            });

        });
    } else {
        parents = await Parent.find({ 'dependents.grade': grade });
    }

    return parents;
}
