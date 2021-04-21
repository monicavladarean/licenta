var express = require("express");
bodyParser = require("body-parser");
//const cors = require("cors");
var db = require("./databaseInitialisation.js");
var StaffRepository = require("./repositories/StaffRepository.js");

var app = express();

//var corsOptions =
//{
//    origin: "http://localhost:8081"
// };
//app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8080;
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get("/", (req, res, next) => {
  res.json({ message: "Server is working" });
});

//require("./routes/routes")(app);

app.get("/test", (req, res, next) => {
  var staffRepository = new StaffRepository();

  (async () => {
    var array = new Array(await staffRepository.getStaff());
    res.json(JSON.stringify(array));
  })();
});

app.use(function (req, res) {
  res.status(404);
});
