var sqlite3 = require("sqlite3");
const { open } = require("sqlite");
var Camp = require("../models/Camp.js");

function CampRepository() {}

async function createDbConnection(filename) {
  return open({
    filename,
    driver: sqlite3.Database,
  });
}

CampRepository.prototype.getCamps = async function (category,status) {
  var dbConnection = null;
  try {
    sqlite3.verbose();
    dbConnection = await createDbConnection("campsDB.sqlite");
    const result = await getCampsSQL(dbConnection,category,status);
    var camps = new Array(result);
    return camps[0];
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection != null) dbConnection.close();
  }
};

async function getCampsSQL(database, category, status) {
  try {
    const query = "";
    if (category === undefined && status === undefined) {
      const query =
        "SELECT id, category, name, location, startDate, duration, minAge, maxAge FROM Camp";
      const result = await database.all(query);
      return result;
    } else if (status === undefined) {
      const query =
        "SELECT id, category, name, location, startDate, duration, minAge, maxAge FROM Camp WHERE category='" +category+"'";
      const result = await database.all(query);
      return result;
    } else if (category === undefined) {
      if(status==="future")
      {
        const query =
        "SELECT id, category, name, location, startDate, duration, minAge, maxAge FROM Camp WHERE startDate> date('now') ";
      const result = await database.all(query);
      return result;
      }
      if(status==="ended")
      {
        const query =
        "SELECT id, category, name, location, startDate, duration, minAge, maxAge FROM Camp WHERE endDate < date('now') ";
      const result = await database.all(query);
      return result;
      }
      if(status==="ongoing")
      {
        const query =
        "SELECT id, category, name, location, startDate, duration, minAge, maxAge FROM Camp WHERE startDate< date('now') AND endDate > date('now') ";
      const result = await database.all(query);
      return result;
      }
    } else {
      if(status==="future")
      {
        const query =
        "SELECT id, category, name, location, startDate, duration, minAge, maxAge FROM Camp WHERE category='" +category+"' AND startDate> date('now') ";
      const result = await database.all(query);
      return result;
      }
      if(status==="ended")
      {
        const query =
        "SELECT id, category, name, location, startDate, duration, minAge, maxAge FROM Camp WHERE category='" +category+"' AND endDate < date('now') ";
      const result = await database.all(query);
      return result;
      }
      if(status==="ongoing")
      {
        const query =
        "SELECT id, category, name, location, startDate, duration, minAge, maxAge FROM Camp WHERE category='" +category+"' AND startDate< date('now') AND endDate > date('now') ";
      const result = await database.all(query);
      return result;
      }
    }
  } catch (error) {
    throw new EvalError("Error in retrieving the data");
  }
}

CampRepository.prototype.deleteCampById = async function (id) {
  var dbConnection = null;
  try {
    sqlite3.verbose();
    dbConnection = await createDbConnection("campsDB.sqlite");
    const result = await deleteCampByIdSQL(dbConnection, id);
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection != null) dbConnection.close();
  }
};

async function deleteCampByIdSQL(dbConnection, id) {
  try {
    const query = "DELETE FROM Camp WHERE id = " + id;
    const result = await dbConnection.run(query);
  } catch (error) {
    throw new EvalError("Error processing delete");
  }
}

CampRepository.prototype.getCampById = async function (id) {
  var dbConnection = null;
  try {
    sqlite3.verbose();
    dbConnection = await createDbConnection("campsDB.sqlite");
    const result = await getCampByIdSQL(dbConnection, id);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection != null) dbConnection.close();
  }
};

async function getCampByIdSQL(dbConnection, id) {
  try {
    const query = "SELECT id, name, description, location, schedule, startDate, endDate, category, capacity, price, minAge, maxAge, requiredEquipment, duration FROM Camp WHERE id = " + id;
    const result = await dbConnection.get(query);
    return result;
  } catch (error) {
    throw new EvalError("Error processing delete");
  }
}

CampRepository.prototype.insertCamp = async function (camp) {
  var dbConnection = null;
  try {      
    sqlite3.verbose();

    dbConnection = await createDbConnection("campsDB.sqlite");
    const result = await insertCampSQL(dbConnection, camp);
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection != null) dbConnection.close();
  }
};

async function insertCampSQL(dbConnection, camp) {
  try {
    var query =
      "INSERT INTO Camp (name, description, location, schedule, startDate, category, capacity, price, minAge, maxAge, requiredEquipment, duration, endDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const result = await dbConnection.run(query, [
      camp.name,
      camp.description,
      camp.location, 
      camp.schedule,
      camp.startDate,
      camp.category, 
      camp.capacity,
      camp.price,
      camp.minAge,
      camp.maxAge,
      camp.requiredEquipment,
      camp.duration,
      camp.endDate
    ]);
  } catch (error) {
    throw new EvalError("Wrong insert input");
  }
}

CampRepository.prototype.updateCampById = async function (camp) {
  var dbConnection = null;
  try {
    sqlite3.verbose();

    dbConnection = await createDbConnection("campsDB.sqlite");
    const result = await updateCampSQL(dbConnection, camp);
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection != null) dbConnection.close();
  }
};

async function updateCampSQL(dbConnection, camp) {
  try {
    var query =
      "UPDATE Camp SET name=?, description=?, location=?, schedule=?, startDate=?, category=?, capacity=?, price=?, minAge=?, maxAge=?, requiredEquipment=?, duration=?, endDate=? WHERE id=?";
    const result = await dbConnection.run(query, [
      camp.name,
      camp.description,
      camp.location, 
      camp.schedule,
      camp.startDate,
      camp.category, 
      camp.capacity,
      camp.price,
      camp.minAge,
      camp.maxAge,
      camp.requiredEquipment,
      camp.duration,
      camp.endDate,
      parseInt(camp.id),
    ]);
  } catch (error) {
    throw new EvalError("Error processing update");
  }
}

module.exports = CampRepository;