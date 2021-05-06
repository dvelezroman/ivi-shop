const express = require("express");
const path = require("path");
var app = express();
const port = process.env.PORT || 80;
//Static file declaration
app.use(express.static(path.join(__dirname, "/build")));
app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
  });

//start server
app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});
