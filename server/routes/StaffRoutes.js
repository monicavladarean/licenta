const Staff = require("../models/Staff.js");
var StaffRepository = require("../repositories/StaffRepository.js");

module.exports = function (app) {
  app.get("/staff", (req, res, next) => {
    var staffRepository = new StaffRepository();

    (async () => {
      res.json(JSON.stringify(await staffRepository.getStaff()));
    })();
  });

  app.delete("/staff/:id", (req, res, next) => {
    var staffRepository = new StaffRepository();

    (async () => {
      await staffRepository.deleteStaffById(req.params.id);
      res.status(200);
    })();
  });

  app.post("/staff", (req, res, next) => {
    var staffRepository = new StaffRepository();

    (async () => {
      await staffRepository.insertStaff(new Staff(req.body.isAdmin,req.body.username,req.body.password,req.body.firstName,req.body.lastName));
      res.status(200);
    })();
  });
};
