'use strict';

module.exports = {
  up: function up(knex) {
    return new Promise(function (resolve, reject) {
      knex.schema.createTable('tags', function (table) {
        table.increments();
        table.string('name').notNullable();
      }).then(resolve).catch(reject);
    });
  },
  down: function down(knex) {
    return new Promise(function (resolve, reject) {
      knex.schema.dropTableIfExists('tags').then(resolve).catch(reject);
    });
  }
};
//# sourceMappingURL=001_tag.js.map
