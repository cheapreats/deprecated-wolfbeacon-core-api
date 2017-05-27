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
    },

    updateHackathonPublishedStatusValidation: {
        body: {
            isPublished: Joi.boolean().strict().required()
        }
    }
};

export default HackathonValidation;