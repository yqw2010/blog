#!/usr/bin/env node

var http = require('http');
var fs = require("fs");
var path = require("path");
var querystring = require("querystring");

var markdown = require( "markdown-js" );
var formidable = require('formidable');

var PORT = 4001;
var Root = __dirname;
var index = 100;
var articlePath;

module.exports = function(article){
  articlePath = path.join(Root, "../blog/src/_drafts/", article.toString() + ".md");

  http.createServer(function(req, res){
    if(req.url === '/') {
      var ctt = fs.readFileSync(path.join(Root, "./public/index.html")).toString();
      var replace = fs.readFileSync(articlePath).toString();
      if(!replace) {
        replace = fs.readFileSync(path.join(Root, "./article.tpl"));
      }
      ctt = ctt.replace(/<textarea>[\s\S]+?<\/textarea>/m, "<textarea>" + replace + "</textarea>");
      res.write(ctt);
      res.end();
    } else if(req.url === '/img') {
      Writer.saveImg(req, res);
    } else if(req.url === '/save') {
      Writer.getPOST(req, res);
    } else if(/^\/blogimgs/.test(req.url)) {
      Writer.sendImg(req, res);
    } else if(/^\/public/.test(req.url)) {
      if(path.extname(req.url) == '.css') {
        res.writeHead(200, {
          "Content-Type": "text/css"
        });
      }
      res.write(fs.readFileSync(path.join(Root, "." + req.url)));
      res.end();
    } else {
      res.write("404 not found!");
      res.end();
    }

  }).listen(PORT, function(){
    console.log("serve at http://0.0.0.0:4001");
  });
};

var Writer = {
  getPOST: function(req, res){
    req.setEncoding('utf-8');
    var postData = [], len = 0;
    req.on("data", function (postDataChunk) {
      postData.push(postDataChunk);
      len += postDataChunk.length;
    });
    req.on("end", function () {
      postData = Buffer.concat(postData, len);
      postData = querystring.parse(postData);
      fs.writeFileSync(articlePath, postData['md']);
      res.writeHead(200, {
        "Content-Type": "text/json"
      });
      res.write('{"code": 200}');
      res.end();
    });
  },
  sendImg: function (req, res) {
    var imgPath = path.join(Root, "../blog/src", req.url);
    res.writeHead(200, {
      "Content-Type": "image/" + path.extname(imgPath).slice(1)
    });
    res.write(fs.readFileSync(imgPath));
    res.end();
  },
  saveImg: function (req, res) {
    var form = new formidable.IncomingForm();
    if(!fs.existsSync(path.join(Root, "./tmp/"))) {
      fs.mkdirSync(path.join(Root, "./tmp/"));
    }
    form.uploadDir = path.join(Root, "./tmp/");
    form.parse(req,function(error, fields, files){
      var year = new Date().getFullYear().toString();
      var month = new Date().getMonth().toString();
      var day = new Date().getDay().toString();

      if(!fs.existsSync(path.join(Root, "../blog/src/blogimgs/", year))) {
        fs.mkdirSync(path.join(Root, "../blog/src/blogimgs/", year));
      }
      if(!fs.existsSync(path.join(Root, "../blog/src/blogimgs/", year, month))) {
        fs.mkdirSync(path.join(Root, "../blog/src/blogimgs/", year, month));
      }
      var name = year + "" + month + day + (++index) + path.extname(files.img.name);
      fs.renameSync(files.img.path, path.join(Root, "../blog/src/blogimgs/", year, month, name));
      console.log("save: " + path.join(Root, "../blog/src/blogimgs/", year, month, name));
      res.writeHead(200, {
        "Content-Type": "text/json"
      });
      res.write(JSON.stringify({
        code: 200,
        path: path.join("/blogimgs/", year, month, name)
      }));
      res.end();
    });
  }
};