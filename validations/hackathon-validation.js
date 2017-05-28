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
    },

    addUserToHackathonRoleValidation: {
        body: {
            userId: Joi.string().required(),
            role: Joi.string().valid('organiser', 'volunteer', 'participant', 'mentor').required()
        }
    },

    getHackathonsValidation: {
        query: {
            type: Joi.string().valid('featured', 'all')
        }
    }
};

export default HackathonValidation;