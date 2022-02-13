const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }},
  {
    timestamps: true
  });

const ImageModel = mongoose.model('img', ImageSchema);

module.exports = ImageModel;