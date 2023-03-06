const db = require('../models')
const jwt = require('jsonwebtoken')

const processLogin = async(req, res) => {
    try {
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
    } catch(err) {
        throw new Error(err.message);
    }
}

const processInsert = async(req, res) => {
    try {
        const { message } = req.body;
        const username = req.jwtUsername;

        await db.transaction(trx => {
            trx.insert({
                message: message,
                username: username
            })
            .into('messages')
            .returning('*')
            .then(result => {
                res.status(200).send({
                    message: 'Message succesfully saved!'
                }) 
            })
            .then(trx.commit)
            .catch(err => {
                trx.rollback
                throw new Error(err.message);
            });
        })
        .catch(err => {
            throw new Error(err.message);
        });
    } catch(err) {
        throw new Error(err.message);
    }
}

const processGet = async(req, res) => {
    try {
        const username = req.jwtUsername;
        
        await db.select('message')
        .from('messages')
        .where('username', '=', username)
        .then(messages => {
            return res.status(200).send({
                data: messages
            })  
        })
    } catch(err) {
        throw new Error(err.message);
    }
}

module.exports = {
    processLogin,
    processInsert,
    processGet
}