#!/usr/bin/env node

var http = require('http');
var PORT = 4001;

module.exports = function(){
  http.createServer(function(req, res){
    res.write("Writing blog, wait for me.");
    res.end();
  }).listen(PORT);
};