'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _hackathonRoutes = require('./hackathon-routes');

var _hackathonRoutes2 = _interopRequireDefault(_hackathonRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/hackathons', _hackathonRoutes2.default);

exports.default = router;
//# sourceMappingURL=index.js.map