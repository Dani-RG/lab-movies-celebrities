const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Introduce a movie name']
  },
  genre: {
    type: String
  },
  plot: {
    type: String
  },
  cast: {
    type: [Schema.Types.ObjectId],
    ref: 'Celebrity'
  }
},
  {
    timestamps: true
  });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;