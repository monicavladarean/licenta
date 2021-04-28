const date = require('date-and-time')

function Registration(id, camp, adult, kid) {
  this.id = id;
  this.camp = camp;
  this.adult = adult;
  this.kid = kid;
  this.registrationDate = new Date().toISOString().split("T")[0];
}

module.exports = Registration;
