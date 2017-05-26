import Joi from 'joi';

const HackathonValidation = {
    createHackathonValidation: {
        body: {
            id: Joi.number().required(),
            uuid: Joi.string().required(),
            data: Joi.object().required()
        }
    },

    updateHackathonDataValidation: {
        body: {
            id: Joi.number().required(),
            data: Joi.object().required()
        }
    }
};

export default HackathonValidation;