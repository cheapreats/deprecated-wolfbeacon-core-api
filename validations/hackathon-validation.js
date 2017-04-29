import Joi from 'joi';

HackathonValidation = {
    createHackathon: {
        body: {
            id: Joi.number().required(),
            uuid: Joi.string().required()
        }
    }
};

export default HackathonValidation;