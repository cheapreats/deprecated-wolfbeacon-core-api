import Joi from 'joi';

const HackathonValidation = {
    createHackathon: {
        body: {
            id: Joi.number().required(),
            uuid: Joi.string().required(),
            data: Joi.object().required()
        }
    }
};

export default HackathonValidation;