// Create web server
// Run: node comments.js
// Test: curl -i http://localhost:3000/comments
// Test: curl -i http://localhost:3000/comments/1
// Test: curl -i -X POST -H "Content-Type: application/json" -d '{"body":"This is a comment","postId":1}' http://localhost:3000/comments
// Test: curl -i -X PUT -H "Content-Type: application/json" -d '{"body":"This is a comment","postId":1}' http://localhost:3000/comments/1
// Test: curl -i -X DELETE http://localhost:3000/comments/1

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var comments = [
  { id: 1, postId: 1, body: 'This is a comment' },
  { id: 2, postId: 1, body: 'This is another comment' },
  { id: 3, postId: 2, body: 'This is yet another comment' }
];

// GET /comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// GET /comments/:id
app.get('/comments/:id', function(req, res) {
  var comment = comments.find(function(comment) {
    return comment.id === parseInt(req.params.id);
  });
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// POST /comments
app.post('/comments', function(req, res) {
  var maxId = comments.reduce(function(max, comment) {
    return comment.id > max ? comment.id : max;
  }, 0);
  var newComment = {
    id: maxId + 1,
    postId: req.body.postId,
    body: req.body.body
  };
  comments.push(newComment);
  res.json(newComment);
});

// PUT /comments/:id
app.put('/comments/:id', function(req, res) {
  var comment = comments.find(function(comment) {
    return comment.id === parseInt(req.params.id);
  });
  if (comment) {
    comment.postId = req.body.postId;
    comment.body = req.body.body;
    res.json(comment);
  } else {
    res