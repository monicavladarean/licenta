var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "campsDB.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) 
    {
      console.error(err.message)
      throw err
    }
    else
    {
        console.log('Connected to database.')
        db.run(`CREATE TABLE Staff(
            id integer PRIMARY KEY AUTOINCREMENT,
            isAdmin boolean,
            username varchar(50) UNIQUE,
            password varchar(50),
            firstName varchar(50),
            lastName varchar(50)
          )`,
          (err) => {
              if (err) 
              {
                  console.log('Staff table ok!')
              }
              else
              {
                  console.log('Creating the staff table.')
  
                  var insert = 'INSERT INTO Staff (isAdmin, username, password, firstName, lastName) VALUES (?,?,?,?,?)'
                  db.run(insert, [true,"admin","adminPassword","Monica", "Vladarean"])
              }
          }); 
          
          db.run(`CREATE TABLE Camp(
            id integer PRIMARY KEY AUTOINCREMENT,
            name varchar(50),
            description varchar(50),
            location varchar(50),
            schedule varchar(1000),
            startDate date,
            endDate date,
            category varchar(50),  
            capacity int,
            price int,
            minAge int,
            maxAge int,
            requiredEquipment varchar(500),
            duration int
          );`,
          (err) => {
              if (err) 
              {
                  console.log('Camp table ok!')
              }
              else
              {
                  console.log('Creating camp table.')
              }
          }); 
          
          db.run(`CREATE TABLE Adult(
            id integer PRIMARY KEY AUTOINCREMENT,
            firstName varchar(50),
            lastName varchar(50),
            email varchar(50),
            phone varchar(50)
          );`,
          (err) => {
              if (err) 
              {
                  console.log('Adult table ok!')
              }
              else
              {
                  console.log('Creating adult table.')
              }
          }); 
          
          db.run(`CREATE TABLE Kid(
            id integer PRIMARY KEY AUTOINCREMENT,
            firstName varchar(50),
            lastName varchar(50),
            email varchar(50),
            dateOfBirth date,
            information varchar(1000)
          );`,
          (err) => {
              if (err) 
              {
                  console.log('Kid table ok!')
              }
              else
              {
                  console.log('Creating kid table.')
              }
          }); 
          
          db.run(`CREATE TABLE Registration(
            id integer PRIMARY KEY AUTOINCREMENT,
            campId int REFERENCES Camp(id),
            adultId int REFERENCES Adult(id),
            kidId int REFERENCES Kid(id),
            registrationDate date
          );`,
        (err) => {
            if (err) 
            {
                console.log('Registration table ok!')
            }
            else
            {
                console.log('Creating registration table.')
            }
        });  
    }
});



db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });

module.exports = db