const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema ({

  groupName: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  memberId: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

module.exports = mongoose.model('Group', groupSchema);
