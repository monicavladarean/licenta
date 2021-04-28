var Registration = require("../models/Registration.js");
var AdultValidator = require("../validators/AdultValidator.js");
var KidValidator = require("../validators/KidValidator.js");

function RegistrationValidator() {}

RegistrationValidator.prototype.validateRegistration = function (registration) {
  if (registration.id != null && !Number.isInteger(registration.id)) {
    throw new TypeError("Id has to be an integer");
  }
  if (registration.campId != null && !Number.isInteger(registration.campId)) {
    throw new TypeError("CampId has to be an integer");
  }

  var adultValidator = new AdultValidator();
  adultValidator.validateAdult(registration.adult);

  var kidValidator = new KidValidator();
  kidValidator.validateKid(registration.kid);
};

module.exports = RegistrationValidator;
