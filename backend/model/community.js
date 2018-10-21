const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* Make the schema */
let communitySchema = new Schema({
    communityName: {type: String, required: true},
    communityDescription: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now},
    founder: {type: String},
    numberOfSubscribers: {type: Number, default: 1},
    moderators: {type: [String]},
    /* Need to store all the submissions for this community, Array? of what? */
  });
  
  
  /* Creating the user model from the schema and giving it to Mongoose */
  let community = mongoose.model('Community', communitySchema);

  
  
  module.exports = community;