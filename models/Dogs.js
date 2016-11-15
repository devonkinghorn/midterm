var mongoose = require('mongoose');
var DogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  upvotes: {type: Number, default: 0},
});
DogSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Dog', DogSchema);
