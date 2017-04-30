import Joi from 'joi';

const HackathonValidation = {
    createHackathon: {
        body: {
            id: Joi.number().required(),
            uuid: Joi.string().required()
        }
    }
};

export default HackathonValidation;