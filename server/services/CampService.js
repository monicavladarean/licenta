var CampValidator = require("../validators/CampValidator.js");
var CampRepository = require("../repositories/CampRepository.js");

function CampService() {}

CampService.prototype.getCamps = async function (category, status) {
    try {
      var campRepository = new CampRepository();
      const camps = await campRepository.getCamps(category, status);
      return camps;
    } catch (error) {
      throw error;
    } 
  };
  
  CampService.prototype.deleteCampById = async function (id) {
    try {
      var campRepository = new CampRepository();
      await campRepository.deleteCampById(id);
    } catch (error) {
      throw error;
    } 
  };
  
  CampService.prototype.insertCamp = async function (camp) {
    try {
      var campValidator = new CampValidator();
      campValidator.validateCamp(camp);
      var campRepository = new CampRepository();
      const result = await campRepository.insertCamp(camp);
    } catch (error) {
      throw error;
    } 
  };
  
  CampService.prototype.updateCampById = async function (camp) {
    try {
      var campValidator = new CampValidator();
      campValidator.validateCamp(camp);
      var campRepository = new CampRepository();
      const result = await campRepository.updateCampById(camp);
    } catch (error) {
      throw error;
    } 
  };

  CampService.prototype.getCampById = async function (id) {
    try {
      var campRepository = new CampRepository();
      const result = await campRepository.getCampById(id);
      return result;
    } catch (error) {
      throw error;
    } 
  };
  

module.exports = CampService;
