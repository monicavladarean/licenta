const date = require('date-and-time')

function Registration(id, campId, adult, kid) {
  this.id = id;
  this.campId = campId;
  this.adult = adult;
  this.kid = kid;
  this.registrationDate = new Date().toISOString().split("T")[0];
}

module.exports = Registration;
