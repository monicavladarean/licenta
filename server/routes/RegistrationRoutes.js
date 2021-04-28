const url = require('url');
const Registration = require("../models/Registration.js");
const Adult = require("../models/Adult.js");
const Kid = require("../models/Kid.js");
const RegistrationService = require("../services/RegistrationService.js");

module.exports = function (app) {

    app.post("/registrations", (req, res, next) => {
        var registrationService = new RegistrationService();
    
        (async () => {
          try {
            
            await registrationService.insertRegistration(
              new Registration(
                null,
                parseInt(req.body.campId),
                new Adult(
                    null,
                    req.body.adultFirstName,
                    req.body.adultLastName,
                    req.body.adultEmail,
                    req.body.adultPhone,
                ),
                new Kid(
                    null,
                    req.body.kidFirstName,
                    req.body.kidLastName,
                    req.body.kidEmail,
                    new Date(req.body.kidDateOfBirth),
                    req.body.kidInformation,
                )
              )
            );
            res.status(200).send({
              message: "Created",
            });
          } catch (error) {
            if (error instanceof TypeError || error instanceof EvalError) {
              res.status(400).send({
                message: error.message,
              });
            } else {
              res.status(500).send({
                message: "Internal server error",
              });
            }
          }
        })();
      });

}