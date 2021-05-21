export class Registration {
    id: Number;
    campId:Number;

    kidId: Number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    information: string;
    
    adultId:Number;
    parentFirstName: string;
    parentLastName: string;
    parentEmail: string;
    phone: string;

    registrationDate:Date
  
    constructor(
      id: Number,
      campId:Number,

      kidId: Number,
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth: Date,
        information: string,
        
        adultId:Number,
        parentFirstName: string,
        parentLastName: string,
        parentEmail: string,
        phone: string,

      registrationDate:Date
    ) {
        this.id = id;
        this.campId = campId;
        
        this.adultId=adultId;
        this.parentFirstName=parentFirstName;
        this.parentLastName=parentLastName;
        this.parentEmail=parentEmail;
        this.phone=phone;

        this.kidId = kidId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.information = information;

        this.registrationDate = registrationDate
  }
}