export class Adult {
  id: Number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  constructor(
    id: Number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {
      this.id=id;
      this.firstName=firstName;
      this.lastName=lastName;
      this.email=email;
      this.phone=phone;
  }
}
