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

        sendByGrade(grade);
        
        return res.status(204).json();
    },
   
}

async function sendByGrade(forGrade){
    //TODO: Eviar a mensagem aos destinatários corretos
    const users = await UserController.getParentsForGrade(forGrade);

    console.log(users);
    return;
}