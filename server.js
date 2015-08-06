/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var config = require("./server/config/config.js");
var path = require("path");

var express = require("express");
var server = express();
server.use(express.static(path.join(__dirname, "./client")));

var bodyParser = require("body-parser");
server.use(bodyParser.json());

require("./server/config/mongoose.js")(config);
require("./server/config/routes.js")(server);

server.listen(config.server_port, config.server_IP, function() {
  console.log("Listening on port " + config.server_port);
})
