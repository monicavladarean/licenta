const Staff = require("../models/Staff.js");
const StaffService = require("../services/StaffService.js");

module.exports = function (app) {
  app.get("/staff", (req, res, next) => {
    var staffService = new StaffService();

    (async () => {
      try {
        res.json(JSON.stringify(await staffService.getStaff()));
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

  app.delete("/staff/:id", (req, res, next) => {
    var staffService = new StaffService();

    (async () => {
      try {
        await staffService.deleteStaffById(req.params.id);
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

  app.post("/staff", (req, res, next) => {
    var staffService = new StaffService();

    (async () => {
      try {
        await staffService.insertStaff(
          new Staff(
            null,
            req.body.isAdmin,
            req.body.username,
            req.body.password,
            req.body.firstName,
            req.body.lastName
          )
        );
        res.status(200).send({
          message: "Created",
        });
      } catch (error) {
        if (error instanceof TypeError) {
          res.status(400).send({
            message: error.message,
          });
        } else if (error instanceof EvalError) {
          res.status(403).send({
            message: "This staff username already exists",
          });
        } else {
          res.status(500).send({
            message: "Internal server error",
          });
        }
      }
    })();
  });

  app.put("/staff/:id", (req, res, next) => {
    var staffService = new StaffService();

    (async () => {
      try {
        await staffService.updateStaffById(
          new Staff(
            parseInt(req.params.id),
            req.body.isAdmin,
            req.body.username,
            req.body.password,
            req.body.firstName,
            req.body.lastName
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

  app.post("/staff/authenticate", (req, res, next) => {
    var staffService = new StaffService();

    (async () => {
      try {

        res.json(JSON.stringify(await staffService.authenticate(req.body.username, req.body.password)));
        
        //await staffService.authenticate(req.body.username, req.body.password);
       // res.status(200).send({
         // message: "Authenticated",
       // });
      } catch (error) {
        res.status(400).send({
          message: "Username or password is incorrect",
        });
      }
    })();
  });
};
