var RegistrationValidator = require("../validators/RegistrationValidator.js");
var RegistrationRepository = require("../repositories/RegistrationRepository.js");

function RegistrationService() {}

RegistrationService.prototype.insertRegistration = async function (registration) {
    try {
      var registrationValidator = new RegistrationValidator();
      registrationValidator.validateRegistration(registration);
      var registrationRepository = new RegistrationRepository();
      const result = await registrationRepository.insertRegistration(registration);
    } catch (error) {
      throw error;
    } 
  };

module.exports = RegistrationService;