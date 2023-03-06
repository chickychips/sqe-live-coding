const db = require('../models')
const jwt = require('jsonwebtoken')

const processLogin = async(req, res) => {
    // const {username, password} = req.body;

    await db.select('username', 'pwd').from('test_users')
    .where('username', '=', 'admin')
    .andWhere('pwd', '=', 'admin')
    .then(user => {
        if (!user[0])
            return res.status(401).send({message: "UNAUTHORIZED"});

        const token = jwt.sign({
            userName: 'test'
        }, 'secret', {expiresIn: 30})

        return res.status(200).send({
            accessToken: token
        })  
    })
}

module.exports = {
    processLogin
}