/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SchemaUser = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('User', SchemaUser);
