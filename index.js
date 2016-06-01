var bs = require("browser-sync").create();
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src'));
app.listen(3000);

bs.init({
  server: "./src",
  files: "./src/*.*",
  middleware: [app]
});
