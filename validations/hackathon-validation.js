var Joi = require('joi');

module.exports = {
    createHackathon: {
        body: {
            id: Joi.number().required(),
            uuid: Joi.string().required(),
            data: Joi.object().required()
        }
    }
};
