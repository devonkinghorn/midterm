var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Dog');

router.get('/dogs', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

router.post('/dogs', function(req, res, next) {
  var dog = new Comment(req.body);
  dog.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});



router.param('dog', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, dog){
    if (err) { return next(err); }
    if (!dog) { return next(new Error("can't find comment")); }
    req.dog = dog;
    return next();
  });
});
router.delete('/dogs/:dog', function(req, res) {
  console.log("in Delete");
  req.dog.remove();
  res.json(req.dog);
});
router.get('/dogs/:dog', function(req, res) {
  res.json(req.dog);
});

router.put('/dogs/:dog/upvote', function(req, res, next) {
  req.dog.upvote(function(err, dog){
    if (err) { return next(err); }
    res.json(dog);
  });
});
module.exports = router;
