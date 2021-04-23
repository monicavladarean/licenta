var sqlite3 = require("sqlite3");
const { open } = require('sqlite');
var Staff = require("../models/Staff.js");


function StaffRepository() {}


async function createDbConnection(filename)
{
    return open({
        filename,
        driver: sqlite3.Database
    });
}

StaffRepository.prototype.getStaff = async function () {
    var dbConnection = null;
    try {
        sqlite3.verbose();
        dbConnection = await createDbConnection('campsDB.sqlite');
        const result = await getStaffSQL(dbConnection);
        var staff = new Array(result);
        return staff;
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally{
        if(dbConnection!=null)
        dbConnection.close();
    }
}


async function getStaffSQL(database) {
    try {
        const query = 'SELECT id, isAdmin, username, firstName, lastName FROM Staff'
        const result = await database.all(query);
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

StaffRepository.prototype.deleteStaffById = async function (id) {
    var dbConnection = null;
    try {
        sqlite3.verbose();
        dbConnection = await createDbConnection('campsDB.sqlite');
        const result = await deleteStaffByIdSQL(dbConnection, id);
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally{
        if(dbConnection!=null)
        dbConnection.close();
    }
}


async function deleteStaffByIdSQL(dbConnection, id) {
    try {
        const query = 'DELETE FROM Staff WHERE id = ' + id;
        const result = await dbConnection.run(query);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

StaffRepository.prototype.insertStaff = async function (staff) {
    var dbConnection = null;
    try {
        sqlite3.verbose();
        dbConnection = await createDbConnection('campsDB.sqlite');
        const result = await insertStaffSQL(dbConnection, staff);
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally{
        if(dbConnection!=null)
        dbConnection.close();
    }
}

async function insertStaffSQL(dbConnection, staff) {
    try {
        var query = 'INSERT INTO Staff (isAdmin, username, password, firstName, lastName) VALUES (?,?,?,?,?)';
        const result = await dbConnection.run(query, [staff.isAdmin,staff.username.toString(),staff.password.toString(),staff.firstName.toString(), staff.lastName.toString()]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = StaffRepository;
