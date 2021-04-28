const date = require('date-and-time')

function Kid(id, firstName, lastName, email, dateOfBirth, information) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.dateOfBirth = dateOfBirth.toISOString().split('T')[0];
  this.information = information;
}

module.exports = Kid;
