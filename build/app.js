"use strict";

var _express = _interopRequireDefault(require("express"));

var _middlewares = _interopRequireDefault(require("./middlewares"));

var _scraper = _interopRequireDefault(require("./scraper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
(0, _middlewares.default)(app);
app.post('/getList', _scraper.default);
const PORT = 8084;
app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server is running');
  }
});