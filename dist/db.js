'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ path: '../.env' }); // db.js


// Development Mode
var db = {};
var option = {};
if (process.env.DB_MODE == 'DEV') {
  option = {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    useNullAsDefault: true
  };
}
var connect = function connect() {
  var db = (0, _knex2.default)(option);
  return db;
};
exports.default = {
  connect: connect
};
//# sourceMappingURL=db.js.map
