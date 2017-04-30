'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _hackathonValidation = require('../validations/hackathon-validation');

var _hackathonValidation2 = _interopRequireDefault(_hackathonValidation);

var _hackathonController = require('../controllers/hackathon-controller');

var _hackathonController2 = _interopRequireDefault(_hackathonController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/create').post((0, _expressValidation2.default)(_hackathonValidation2.default.createHackathon), _hackathonController2.default.createHackathon);

router.route('/').get(_hackathonController2.default.getHackathonDataAsOrganiser);

exports.default = router;
//# sourceMappingURL=hackathon-routes.js.map