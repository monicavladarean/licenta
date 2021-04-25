const Staff = require("../models/Staff.js");
var StaffRepository = require("../repositories/StaffRepository.js");

module.exports = function (app) {
  app.get("/staff", (req, res, next) => {
    var staffRepository = new StaffRepository();

    (async () => {
      try {
        res.json(JSON.stringify(await staffRepository.getStaff()));
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
    var staffRepository = new StaffRepository();

    (async () => {
      try {
        await staffRepository.deleteStaffById(req.params.id);
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
    var staffRepository = new StaffRepository();

    (async () => {
      try {
        await staffRepository.insertStaff(
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
    var staffRepository = new StaffRepository();

    (async () => {
      try {
        await staffRepository.updateStaffById(
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
};
