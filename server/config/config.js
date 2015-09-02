/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

module.exports = function() {
  var manual = true,
      onlinedb = true,
      user = "admin:root",
      url = "ds063869.mongolab.com:63869",
      dbname = "bonapetit",
      mongolab = "mongodb://" + user + "@" + url + "/" + dbname;

  return {
    server_port: manual ? 4000 : process.env.PORT,
    server_IP: manual ? "127.0.0.1" : process.env.IP,
    server_DB: onlinedb ? mongolab : "mongodb://localhost/" + dbname,
    models_path: __dirname + "/../models"
  };
}();
