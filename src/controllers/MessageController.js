const Message = require('../models/Message');
const moment = require('moment');
const Parent = require('../models/Parent');
const UserController = require('./ParentController');


module.exports = {

    async store(req, res){

        const { title, summary, content, grade, image_link } = req.body;
        const send_date = moment.now();
        const alread_read = false;

        /*const message = await Message.create({
            title,
            summary,
            content,
            send_date,
            image_link,
            grade,
            alread_read
        });*/

        send(grade);
        
        return res.status(204).json();
    },

   
}

function send(forGrade){
    //TODO: Eviar a mensagem aos destinatários corretos
    const users = UserController.getParentsForGrade(forGrade);

    console.log(users);
    return;
}