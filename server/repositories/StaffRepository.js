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
        throw new Error('Error in retrieving the data');
    }
}

StaffRepository.prototype.deleteStaffById = async function (id) {
    var dbConnection = null;
    try {
        sqlite3.verbose();
        dbConnection = await createDbConnection('campsDB.sqlite');
        const result = await deleteStaffByIdSQL(dbConnection, id);
    } catch (error) {
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
        throw new Error('Error processing delete');
    }
}

StaffRepository.prototype.insertStaff = async function (staff) {
    var dbConnection = null;
    try {
        sqlite3.verbose();
        dbConnection = await createDbConnection('campsDB.sqlite');
        const result = await insertStaffSQL(dbConnection, staff);
    } catch (error) {
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
        throw new Error('Wrong insert input');
    }
}

StaffRepository.prototype.updateStaffById = async function (staff) {
    var dbConnection = null;
    try {
        sqlite3.verbose();
        dbConnection = await createDbConnection('campsDB.sqlite');
        const result = await updateStaffSQL(dbConnection, staff);
    } catch (error) {
        throw error;
    }
    finally{
        if(dbConnection!=null)
        dbConnection.close();
    }
}

async function updateStaffSQL(dbConnection, staff) {
    try {
        var query = 'UPDATE Staff SET isAdmin=?, username=?, password=?, firstName=?, lastName=? WHERE id=?';
        const result = await dbConnection.run(query, [staff.isAdmin,staff.username.toString(),staff.password.toString(),staff.firstName.toString(), staff.lastName.toString(),parseInt(staff.id)]);
    } catch (error) {
        throw new Error('Error processing update');
    }
}

module.exports = StaffRepository;
