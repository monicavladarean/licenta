var Camp = require("../models/Camp.js");

function CampValidator() {}

CampValidator.prototype.validateCamp = function (camp) {
  if (camp.id != null && !Number.isInteger(camp.id)) {
    throw new TypeError("Id has to be an integer");
  }
  if (typeof camp.name != "string" || camp.name == "") {
    throw new TypeError("Name has to be a nonempty string");
  }
  if (typeof camp.description != "string" || camp.description == "") {
    throw new TypeError("Description has to be a nonempty string");
  }
  if (typeof camp.location != "string" || camp.location == "") {
    throw new TypeError("Location has to be a nonempty string");
  }
  if (typeof camp.schedule != "string" || camp.schedule == "") {
    throw new TypeError("Schedule has to be a nonempty string");
  }
  if (typeof camp.requiredEquipment != "string" || camp.requiredEquipment == "") {
    throw new TypeError("RequiredEquipment has to be a nonempty string");
  }
  if (!Number.isInteger(camp.capacity) || camp.capacity == null) {
    throw new TypeError("Capacity has to be an integer");
  }
  if (!Number.isInteger(camp.price) || camp.price == null) {
    throw new TypeError("Price has to be an integer");
  }
  if (!Number.isInteger(camp.minAge) || camp.minAge == null) {
    throw new TypeError("MinAge has to be an integer");
  }
  if (!Number.isInteger(camp.maxAge) || camp.maxAge == null) {
    throw new TypeError("MaxAge has to be an integer");
  }
  if (!Number.isInteger(camp.duration) || camp.duration == null) {
    throw new TypeError("Duration has to be an integer");
  }
  if (typeof camp.category != "string" || camp.location == "") {
    throw new TypeError("Category has to be a nonempty string");
  }
  if (!["horseriding", "swimming", "biking", "hiking", "dance", "cooking", "language"].includes(camp.category)) {
    throw new TypeError("Invalid category");
  }
};

module.exports = CampValidator;
