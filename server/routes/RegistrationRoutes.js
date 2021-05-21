const url = require("url");
const Registration = require("../models/Registration.js");
const Adult = require("../models/Adult.js");
const Kid = require("../models/Kid.js");
const RegistrationService = require("../services/RegistrationService.js");

module.exports = function (app) {
  app.get("/registrations", (req, res, next) => {
    var registrationService = new RegistrationService();
    const queryObject = url.parse(req.url, true).query;

    (async () => {
      try {
        res.json(
          JSON.stringify(
            await registrationService.getRegistrations(
              queryObject.campIdForFilter
            )
          )
        );
      } catch (error) {
        if (error instanceof EvalError || error instanceof TypeError) {
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

  
  app.get("/registrations/:id", (req, res, next) => {
    var registrationService = new RegistrationService();

    (async () => {
      try {
        res.json(
          JSON.stringify(await registrationService.getRegistrationById(parseInt(req.params.id)))
        );
      } catch (error) {
        if (error instanceof EvalError || error instanceof TypeError) {
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
              req.body.adultPhone
            ),
            new Kid(
              null,
              req.body.kidFirstName,
              req.body.kidLastName,
              req.body.kidEmail,
              new Date(req.body.kidDateOfBirth),
              req.body.kidInformation
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

  app.delete("/registrations/:id", (req, res, next) => {
    var registrationService = new RegistrationService();

    (async () => {
      try {
        await registrationService.deleteRegistrationById(req.params.id);
        res.status(200).send({
          message: "Deleted",
        });
      } catch (error) {
        if (error instanceof EvalError || error instanceof TypeError) {
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

  app.put("/registrations/:id", (req, res, next) => {
    var registrationService = new RegistrationService();

    (async () => {
      try {
        await registrationService.updateRegistrationById(
          new Registration(
            parseInt(req.params.id),
            parseInt(req.body.campId),
            new Adult(
              null,
              req.body.adultFirstName,
              req.body.adultLastName,
              req.body.adultEmail,
              req.body.adultPhone
            ),
            new Kid(
              null,
              req.body.kidFirstName,
              req.body.kidLastName,
              req.body.kidEmail,
              new Date(req.body.kidDateOfBirth),
              req.body.kidInformation
            )
          )
        );
        res.status(200).send({
          message: "Updated",
        });
      } catch (error) {
        if (error instanceof EvalError || error instanceof TypeError) {
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
};
