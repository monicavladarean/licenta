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
};
