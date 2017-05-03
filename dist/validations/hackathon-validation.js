'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HackathonValidation = {
    createHackathonValidation: {
        body: {
            id: _joi2.default.number().required(),
            uuid: _joi2.default.string().required(),
            data: _joi2.default.object().required()
        }
    }
};

exports.default = HackathonValidation;
//# sourceMappingURL=hackathon-validation.js.map