'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hackathonSchema = new _mongoose2.default.Schema({
    _id: { type: Number, required: true },
    uuid: { type: String, required: true },
    data: { type: Object, required: true },
    organisers: [String],
    volunteers: [String],
    participants: [String],
    mentors: [String]
});

exports.default = _mongoose2.default.model('Hackathon', hackathonSchema);
//# sourceMappingURL=hackathon-model.js.map