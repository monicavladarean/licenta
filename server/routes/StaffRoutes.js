const Staff = require("../models/Staff.js");
var StaffRepository = require("../repositories/StaffRepository.js");

module.exports = function (app) {
  app.get("/staff", (req, res, next) => {
    var staffRepository = new StaffRepository();

    (async () => {
      try {
        res.json(JSON.stringify(await staffRepository.getStaff()));
      } catch (error) {
        console.error(error);
        res.status(400).send({
          message: error.message,
        });
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
        console.error(error);
        res.status(400).send({
          message: error.message,
        });
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
        console.error(error);
        res.status(400).send({
          message: error.message,
        });
      }
    })();
  });

  app.put("/staff/:id", (req, res, next) => {
    var staffRepository = new StaffRepository();

    (async () => {
      try {
        await staffRepository.updateStaffById(
          new Staff(
            req.params.id,
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
        console.error(error);
        res.status(400).send({
          message: error.message,
        });
      }
    })();
  });
};
