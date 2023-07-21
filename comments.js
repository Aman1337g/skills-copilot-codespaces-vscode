// create web server
// get comments from db
// send comments to client

// import modules
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// import my modules
var db = require('../db');

// route: /comments
router.get('/', function(req, res, next) {
  // get comments from db
  db.getComments(function(err, comments) {
    if (err) {
      return next(err);
    }
    // send comments to client
    res.json(comments);
  });
});

// route: /comments
router.post('/', function(req, res, next) {
  // get comment from client
  var comment = req.body;
  // add comment to db
  db.addComment(comment, function(err, comment) {
    if (err) {
      return next(err);
    }
    // send comment to client
    res.json(comment);
  });
});

// route: /comments/:id
router.put('/:id', function(req, res, next) {
  // get comment from client
  var comment = req.body;
  // update comment in db
  db.updateComment(comment, function(err, comment) {
    if (err) {
      return next(err);
    }
    // send comment to client
    res.json(comment);
  });
});

// route: /comments/:id
router.delete('/:id', function(req, res, next) {
  // get comment id from client
  var id = req.params.id;
  // delete comment from db
  db.deleteComment(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    // send comment to client
    res.json(comment);
  });
});

// export router
module.exports = router;