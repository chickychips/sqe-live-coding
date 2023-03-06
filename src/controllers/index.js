const service = require('../services/index')

exports.login = async(req, res) => {
    try {
        await service.processLogin(req, res);
    } catch(e) {
        console.log(e)
        res.status(500).send({
            message: 'INTERNAL SERVER ERROR'
          });
    }
}

exports.postData = async(req, res) => {
    try {
        await service.processInsert(req, res);
    } catch(e) {
        console.log(e)
        res.status(500).send({
            message: 'INTERNAL SERVER ERROR'
          });
    }
}

exports.getData = async(req, res) => {
    try {
        await service.processGet(req, res);
    } catch(e) {
        console.log(e)
        res.status(500).send({
            message: 'INTERNAL SERVER ERROR'
          });
    }
}