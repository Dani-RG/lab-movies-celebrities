const mongoose = require('mongoose');
const { Schema } = mongoose;

const celebritySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Introduce a celebrity name']
  },
  occupation: {
    type: String
  },
  catchPhrase: {
    type: String
  }
},
  {
    timestamps: true
  });

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;