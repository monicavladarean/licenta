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

RegistrationRepository.prototype.getRegistrations = async function (
  campIdForFilter
) {
  var dbConnection = null;
  try {
    sqlite3.verbose();
    dbConnection = await createDbConnection("campsDB.sqlite");
    const result = await getRegistrationsSQL(dbConnection, campIdForFilter);
    var registration = new Array(result);
    return registration[0];
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection != null) dbConnection.close();
  }
};

async function getRegistrationsSQL(database, campIdForFilter) {
  try {
    if (campIdForFilter == undefined) {
      const query =
        "select Registration.id, Registration.campId, Registration.adultId, Registration.kidId, Registration.registrationDate, Kid.firstName, Kid.lastName, Kid.email, Kid.dateOfBirth, Kid.information, Adult.firstName as parentFirstName, Adult.lastName as parentLastName, Adult.email as parentEmail, Adult.phone from Registration join Kid on Registration.kidId=Kid.id join Adult on Adult.id=Registration.adultId"
      const result = await database.all(query);
      return result;
    } else {
      const query =
        "select Registration.id, Registration.campId, Registration.adultId, Registration.kidId, Registration.registrationDate, Kid.firstName, Kid.lastName, Kid.email, Kid.dateOfBirth, Kid.information, Adult.firstName as parentFirstName, Adult.lastName as parentLastName, Adult.email as parentEmail, Adult.phone from Registration join Kid on Registration.kidId=Kid.id join Adult on Adult.id=Registration.adultId WHERE campId=" +
        campIdForFilter;
      const result = await database.all(query);
      return result;
    }
  } catch (error) {
    throw new EvalError("Error in retrieving the data");
  }
}

RegistrationRepository.prototype.insertRegistration = async function (
  registration
) {
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

RegistrationRepository.prototype.deleteRegistrationById = async function (id) {
  var dbConnection = null;
  try {
    sqlite3.verbose();
    dbConnection = await createDbConnection("campsDB.sqlite");
    const result = await deleteRegistrationByIdSQL(dbConnection, id);
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection != null) dbConnection.close();
  }
};

async function deleteRegistrationByIdSQL(dbConnection, id) {
  try {
    const query = "DELETE FROM Registration WHERE id = " + id;
    const result = await dbConnection.run(query);
  } catch (error) {
    throw new EvalError("Error processing delete");
  }
}

RegistrationRepository.prototype.updateRegistrationById = async function (registration) {
    var dbConnection = null;
    try {
      sqlite3.verbose();
  
      dbConnection = await createDbConnection("campsDB.sqlite");
      const result = await updateRegistrationSQL(dbConnection, registration);
    } catch (error) {
      throw error;
    } finally {
      if (dbConnection != null) dbConnection.close();
    }
  };
  
  async function updateRegistrationSQL(dbConnection, registration) {
    try {
        var queryIdAdultKid =
        "SELECT adultId, kidId FROM Registration WHERE id=" + parseInt(registration.id);
        const idAdultKid = await dbConnection.get(queryIdAdultKid);
      var query1 =
        "UPDATE Registration SET campId=? WHERE id=" + parseInt(registration.id);
        var query2 =
        "UPDATE Adult SET firstName=?, lastName=?, email=?, phone=? WHERE id=" + parseInt(idAdultKid.adultId);
        var query3 =
        "UPDATE Kid SET firstName=?, lastName=?, email=?, dateOfBirth=?, information=? WHERE id=" + parseInt(idAdultKid.kidId);
      const result1 = await dbConnection.run(query1, [
        parseInt(registration.campId),
      ]);
      const result2 = await dbConnection.run(query2, [
        registration.adult.firstName,
        registration.adult.lastName,
        registration.adult.email,
        registration.adult.phone,
      ]);
      const result3 = await dbConnection.run(query3, [
        registration.kid.firstName,
        registration.kid.lastName,
        registration.kid.email,
        registration.kid.dateOfBirth,
        registration.kid.information,
      ]);

    } catch (error) {
      throw new EvalError("Error processing update");
    }
  }

module.exports = RegistrationRepository;
