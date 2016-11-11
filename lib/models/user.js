const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const userSchema = new Schema ({

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [ String ]
});


module.exports = mongoose.model('Player', userSchema);
