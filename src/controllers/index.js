const service = require('../services/index')

exports.login = async(req, res) => {
    try {
        result = await service.processLogin(req, res);
    } catch(e) {
        console.log(e)
    }
}

exports.postData = async(req, res) => {
    try {
        result = await service.processInsert(req, res);
    } catch(e) {
        console.log(e)
    }
}

exports.getData = async(req, res) => {
    try {
        result = await service.processGet(req, res);
    } catch(e) {
        console.log(e)
    }
}