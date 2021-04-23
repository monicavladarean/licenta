function Staff(isAdmin, username, password, firstName, lastName) 
{       
    this.isAdmin = isAdmin;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
}

module.exports = Staff;