function Staff(id, isAdmin, username, password, firstName, lastName) 
{       
    this.id = id;
    this.isAdmin = isAdmin;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
}

module.exports = Staff;