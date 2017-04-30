'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    _id: { type: String, required: true },
    organising: [String],
    volunteering: [String],
    participating: [String],
    mentoring: [String]
});

exports.default = _mongoose2.default.model('User', userSchema);
//# sourceMappingURL=user-model.js.map