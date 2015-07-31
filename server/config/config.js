module.exports = function(){
  var manual = true;
  return {
    server_port: manual ? 4000 : process.env.PORT,
    server_IP: manual ? "127.0.0.1" : process.env.IP,
    user: "admin:root",
    url: "ds063869.mongolab.com:63869",
    dbname: "bonapetit",
    models_path:  __dirname + "/../models"
  };
}();
