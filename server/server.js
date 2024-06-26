var express = require("express");
bodyParser = require("body-parser");
const cors = require("cors");
var db = require("./databaseInitialisation.js");
const basicAuthentication = require("./helpers/basicAuthentication");

var app = express();

//var corsOptions =
//{
//    origin: "http://localhost:8081"
// };
//app.use(cors(corsOptions));

app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(basicAuthentication);

var HTTP_PORT = 8080;
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get("/", (req, res, next) => {
  res.json({ message: "Server is working" });
});

var staffRoutes = require("./routes/StaffRoutes")(app);
var campRoutes = require("./routes/CampRoutes")(app);
var registrationRoutes = require("./routes/RegistrationRoutes")(app);

app.use(function (req, res) {
  res.status(404);
});
