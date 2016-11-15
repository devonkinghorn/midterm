var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Car');

router.get('/cars', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

router.post('/cars', function(req, res, next) {
  var car = new Comment(req.body);
  car.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});



router.param('car', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, car){
    if (err) { return next(err); }
    if (!car) { return next(new Error("can't find comment")); }
    req.car = car;
    return next();
  });
});
router.delete('/cars/:car', function(req, res) {
  console.log("in Delete");
  req.car.remove();
  res.json(req.car);
});
router.get('/cars/:car', function(req, res) {
  res.json(req.car);
});

router.put('/cars/:car/upvote', function(req, res, next) {
  req.car.upvote(function(err, car){
    if (err) { return next(err); }
    res.json(car);
  });
});
module.exports = router;
