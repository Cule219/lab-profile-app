const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const imgSchema = new Schema({
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String },
})


module.exports = mongoose.model('Image', imgSchema);;