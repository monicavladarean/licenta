var Adult = require("../models/Adult.js");

function AdultValidator() {}

AdultValidator.prototype.validateAdult = function (adult) {
  if (adult.id != null && !Number.isInteger(adult.id)) {
    throw new TypeError("Id has to be an integer");
  }
  if (typeof adult.firstName != "string" || adult.firstName == "") {
    throw new TypeError("First Name has to be a nonempty string");
  }
  if (typeof adult.lastName != "string" || adult.lastName == "") {
    throw new TypeError("Last Name has to be a nonempty string");
  }
  if (typeof adult.email != "string" || adult.email == "") {
    throw new TypeError("Email has to be a nonempty string");
  }
  if (typeof adult.phone != "string" || adult.phone == "") {
    throw new TypeError("Phone has to be a nonempty string");
  }
};

module.exports = AdultValidator;
