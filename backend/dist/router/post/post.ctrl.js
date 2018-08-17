"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var uploadImage = exports.uploadImage = function uploadImage(req, res) {
  var imgFile = req.file;
  res.json(imgFile);
};

var write = exports.write = function write(req, res) {
  console.log(req.body);
  res.json(req.body);
};