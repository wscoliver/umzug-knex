/*
  @name 001_tag.js
  @description Migration test for tag.
*/

import { expect } from 'chai'
import Umzug from 'umzug'
import db from '../../db'
import fs from 'fs'
import path from 'path'

describe('Migration: 001_tag.js', function () {
  let migrationDir = path.join(__dirname,'/../../migrations')
  let umzug = {}
  let knex = {}
  before(function (done) {
    knex = db.connect()
    umzug = new Umzug({
      storage: 'json',
      migrations: {
        params: [ knex ],
        path: migrationDir,
        pattern: /[^=&#]+.js$/
      }
    })
    umzug.pending().then(function (migrations) {
      umzug.execute({
        method: 'up',
        migrations: [
          '001_tag'
        ]
      }).then(function(migrated) {
        done()
      }).catch(function(err) {
        console.warn(err)
      })
    })
  })
  it('should migrate the tags table', function(done) {
    knex.schema.hasTable('tags').then(function(exists) {
      expect(exists).to.equal(true)
      done()
    })
  })
  it('should have an ID field and a name field.', function(done) {
    knex('tags').columnInfo().then(function(info) {
      expect(typeof(info.id)).to.not.equal('undefined')
      expect(info.id.type).to.equal('int') 
      expect(info.id.nullable).to.equal(false) 
      expect(typeof(info.name)).to.not.equal('undefined')
      expect(info.name.type).to.equal('varchar') 
      expect(info.name.nullable).to.equal(false) 
      done()
    })
  })
  it('should drop the tags table', function(done) {
    umzug.execute({
      method: 'down',
      migrations: [
        '001_tag'
      ]
    }).then((result) => {
      return new Promise((resolve, reject) => {
        knex.schema.hasTable('tags').then(resolve).catch(reject)
      })
    }).then((res) => {
      expect(res).to.equal(false)
      done()
    })
  })
})
