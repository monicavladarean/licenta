var Staff = require("../models/Staff.js");

function StaffValidator() {}

StaffValidator.prototype.validateStaff = function (staff) {
  if (staff.id != null && !Number.isInteger(staff.id)) {
    throw new TypeError("Id has to be an integer");
  }
  if (staff.isAdmin != "true" && staff.isAdmin != "false") {
    throw new TypeError("isAdmin has to be a boolean (true/false)");
  }
  if (typeof staff.username != "string" || staff.username == "") {
    throw new TypeError("Username has to be a nonempty string");
  }
  if (typeof staff.password != "string" || staff.password == "") {
    throw new TypeError("Password has to be a nonempty string");
  }
  if (typeof staff.firstName != "string" || staff.firstName == "") {
    throw new TypeError("First Name has to be a nonempty string");
  }
  if (typeof staff.lastName != "string" || staff.lastName == "") {
    throw new TypeError("Last Name has to be a nonempty string");
  }
};

module.exports = StaffValidator;
