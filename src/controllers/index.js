const service = require('../services/index')

exports.login = async(req, res) => {
    try {
        result = await service.processLogin(req, res);
    } catch(e) {
        console.log(e)
    }
}