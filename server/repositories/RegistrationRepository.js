var sqlite3 = require("sqlite3");
const { open } = require("sqlite");
var Registration = require("../models/Registration.js");

function RegistrationRepository() {}

async function createDbConnection(filename) {
  return open({
    filename,
    driver: sqlite3.Database,
  });
}

RegistrationRepository.prototype.insertRegistration = async function (registration) {
    var dbConnection = null;
    try {      
      sqlite3.verbose();
  
      dbConnection = await createDbConnection("campsDB.sqlite");
      const result = await insertRegistrationSQL(dbConnection, registration);
    } catch (error) {
      throw error;
    } finally {
      if (dbConnection != null) dbConnection.close();
    }
  };
  
  async function insertRegistrationSQL(dbConnection, registration) {
    try {
      var query1 =
        "INSERT INTO Adult (firstName, lastName, email, phone) VALUES (?,?,?,?)";
    var query2 =
        "INSERT INTO Kid (firstName, lastName, email, dateOfBirth, information) VALUES (?,?,?,?,?)";
    var query3 =
        "SELECT id FROM Adult WHERE firstName=? AND lastName=? AND email=? AND phone=?";
    var query4 =
        "SELECT id FROM Kid WHERE firstName=? AND lastName=? AND email=? AND dateOfBirth=? AND information=?";
    var query5 =
        "INSERT INTO Registration (campId, adultId, kidId, registrationDate) VALUES (?,?,?,?)";
      const result1 = await dbConnection.run(query1, [
       registration.adult.firstName,
       registration.adult.lastName,
       registration.adult.email,
       registration.adult.phone,
      ]);

      const result2 = await dbConnection.run(query2, [
        registration.kid.firstName,
        registration.kid.lastName,
        registration.kid.email,
        registration.kid.dateOfBirth,
        registration.kid.information,
    ]);

    const idAdult = await dbConnection.get(query3, [
        registration.adult.firstName,
        registration.adult.lastName,
        registration.adult.email,
        registration.adult.phone,
    ]);

    const idKid = await dbConnection.get(query4, [
        registration.kid.firstName,
        registration.kid.lastName,
        registration.kid.email,
        registration.kid.dateOfBirth,
        registration.kid.information,
    ]);

    const result5 = await dbConnection.run(query5, [
        registration.campId,
        idAdult.id,
        idKid.id,
        registration.registrationDate,
    ]);
    } catch (error) {
      throw new EvalError("Wrong insert input");
    }
  }

module.exports = RegistrationRepository;
