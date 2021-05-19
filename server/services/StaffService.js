var StaffValidator = require("../validators/StaffValidator.js");
var StaffRepository = require("../repositories/StaffRepository.js");

function StaffService() {}


StaffService.prototype.getStaff = async function () {
  try {
    var staffRepository = new StaffRepository();
    const staff = await staffRepository.getStaff();
    return staff;
  } catch (error) {
    throw error;
  } 
};

StaffService.prototype.deleteStaffById = async function (id) {
  try {
    var staffRepository = new StaffRepository();
    await staffRepository.deleteStaffById(id);
  } catch (error) {
    throw error;
  } 
};

StaffService.prototype.insertStaff = async function (staff) {
  try {
    var staffValidator = new StaffValidator();
    staffValidator.validateStaff(staff);
    var staffRepository = new StaffRepository();
    const result = await staffRepository.insertStaff(staff);
  } catch (error) {
    throw error;
  } 
};

StaffService.prototype.updateStaffById = async function (staff) {
  try {
    var staffValidator = new StaffValidator();
    staffValidator.validateStaff(staff);
    var staffRepository = new StaffRepository();
    const result = await staffRepository.updateStaffById(staff);
  } catch (error) {
    throw error;
  } 
};

StaffService.prototype.authenticate = async function ( username, password ) {
    try {
    var staffRepository = new StaffRepository();
    const user =await staffRepository.authenticate(username,password);
    return user;
    } catch (error) {
      throw error;
    }

}

StaffService.prototype.getStaffById = async function (id) {
  try {
    var staffRepository = new StaffRepository();
    const result = await staffRepository.getStaffById(id);
    return result;
  } catch (error) {
    throw error;
  } 
};

module.exports = StaffService;
