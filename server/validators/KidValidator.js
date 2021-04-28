var Kid = require("../models/Kid.js");

function KidValidator() {}

KidValidator.prototype.validateKid = function (kid) {
  if (kid.id != null && !Number.isInteger(kid.id)) {
    throw new TypeError("Id has to be an integer");
  }
  if (typeof kid.firstName != "string" || kid.firstName == "") {
    throw new TypeError("First Name has to be a nonempty string");
  }
  if (typeof kid.lastName != "string" || kid.lastName == "") {
    throw new TypeError("Last Name has to be a nonempty string");
  }
  if (typeof kid.email != "string") {
    throw new TypeError("Email has to be a string");
  }

  if (typeof kid.information != "string") {
    throw new TypeError("Information has to be a string");
  }
};

module.exports = KidValidator;
