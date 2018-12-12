"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = app => {
  app.use(_bodyParser.default.json());
  app.use(_bodyParser.default.urlencoded({
    extended: false
  }));
  app.use((0, _cors.default)());
};

exports.default = _default;