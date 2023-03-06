const db = require('../models')
const jwt = require('jsonwebtoken')

const processLogin = async(req, res) => {
    const {username, password} = req.body;

    await db.select('username', 'pwd').from('test_users')
    .where('username', '=', username)
    .andWhere('pwd', '=', password)
    .then(user => {
        if (!user[0])
            return res.status(401).send({message: "UNAUTHORIZED"});

        const token = jwt.sign({
            username
        }, 'secret', {expiresIn: 3600000})

        return res.status(200).send({
            accessToken: token
        })  
    })
}

const processInsert = async(req, res) => {
    const {message} = req.body;


    db.transaction(trx => {
        trx.insert({
            message: message
        })
        .into('messages')
        .returning('*')
        .then(result => {
            res.status(200).send({
                message: 'Message succesfully saved!'
            }) 
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        console.log(err.message);
        throw new Error(err.message);
    });
}

const processGet = async(req, res) => {
    await db.select('message').from('messages')
    .then(messages => {
        return res.status(200).send({
            data: messages
        })  
    })
}

module.exports = {
    processLogin,
    processInsert,
    processGet
}