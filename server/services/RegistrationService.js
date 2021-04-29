var RegistrationValidator = require("../validators/RegistrationValidator.js");
var RegistrationRepository = require("../repositories/RegistrationRepository.js");

function RegistrationService() {}

RegistrationService.prototype.getRegistrations = async function (campIdForFilter) {
  try {
    var registrationRepository = new RegistrationRepository();
    const registration = await registrationRepository.getRegistrations(campIdForFilter);
    return registration;
  } catch (error) {
    throw error;
  }
};

RegistrationService.prototype.insertRegistration = async function (
  registration
) {
  try {
    var registrationValidator = new RegistrationValidator();
    registrationValidator.validateRegistration(registration);
    var registrationRepository = new RegistrationRepository();
    const result = await registrationRepository.insertRegistration(
      registration
    );
  } catch (error) {
    throw error;
  }
};

RegistrationService.prototype.deleteRegistrationById = async function (id) {
  try {
    var registrationRepository = new RegistrationRepository();
    await registrationRepository.deleteRegistrationById(id);
  } catch (error) {
    throw error;
  }
};

RegistrationService.prototype.updateRegistrationById = async function (registration) {
    try {
        var registrationValidator = new RegistrationValidator();
        registrationValidator.validateRegistration(registration);
        var registrationRepository = new RegistrationRepository();
      const result = await registrationRepository.updateRegistrationById(registration);
    } catch (error) {
      throw error;
    } 
  };

module.exports = RegistrationService;
