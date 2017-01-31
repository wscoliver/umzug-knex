'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                                @name 001_tag.js
                                                                                                                                                                                                                                                                                @description Migration test for tag.
                                                                                                                                                                                                                                                                              */

var _chai = require('chai');

var _umzug = require('umzug');

var _umzug2 = _interopRequireDefault(_umzug);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Migration: 001_tag.js', function () {
  var migrationDir = _path2.default.join(__dirname, '/../../migrations');
  var umzug = {};
  var knex = {};
  before(function (done) {
    knex = _db2.default.connect();
    umzug = new _umzug2.default({
      storage: 'json',
      migrations: {
        params: [knex],
        path: migrationDir,
        pattern: /[^=&#]+.js$/
      }
    });
    umzug.execute({
      method: 'up',
      migrations: ['001_tag']
    }).then(function (migrated) {
      done();
    }).catch(function (err) {
      console.warn(err);
    });
  });
  it('should migrate the tags table', function (done) {
    knex.schema.hasTable('tags').then(function (exists) {
      (0, _chai.expect)(exists).to.equal(true);
      done();
    });
  });
  it('should have an ID field and a name field.', function (done) {
    knex('tags').columnInfo().then(function (info) {
      (0, _chai.expect)(_typeof(info.id)).to.not.equal('undefined');
      (0, _chai.expect)(info.id.type).to.equal('int');
      (0, _chai.expect)(info.id.nullable).to.equal(false);
      (0, _chai.expect)(_typeof(info.name)).to.not.equal('undefined');
      (0, _chai.expect)(info.name.type).to.equal('varchar');
      (0, _chai.expect)(info.name.nullable).to.equal(false);
      done();
    });
  });
  it('should drop the tags table', function (done) {
    umzug.execute({
      method: 'down',
      migrations: ['001_tag']
    }).then(function (result) {
      return new Promise(function (resolve, reject) {
        knex.schema.hasTable('tags').then(resolve).catch(reject);
      });
    }).then(function (res) {
      (0, _chai.expect)(res).to.equal(false);
      done();
    });
  });
});
//# sourceMappingURL=001_tag.js.map
