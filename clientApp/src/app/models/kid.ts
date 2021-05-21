export class Kid {
    id: Number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    information: string;
  
    constructor(
      id: Number,
      firstName: string,
      lastName: string,
      email: string,
      dateOfBirth: Date,
      information: string,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.information = information;
  }
}