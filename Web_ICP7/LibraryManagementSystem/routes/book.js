var express = require('express');
var router = express.Router();
var Book = require('../models/Book.js');

/* GET ALL BOOKS */
router.get('/', function (req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function (req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
      //request to router to update the database entry with the new entry by id(took from https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate)
      router.put('/:id', function(req, res, next) {
        Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
      });
      //request to router to delete the database entry by id
      router.delete('/:id', function(req, res, next) {
        Book.deleteOne({_id: req.params.id}, function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
      });

module.exports = router;
