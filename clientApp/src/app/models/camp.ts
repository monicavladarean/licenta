export class Camp {
  id: Number;
  name: string;
  description: string;
  location: string;
  schedule: string;
  startDate: Date;
  endDate: Date;
  category: string;
  capacity: Number;
  price: Number;
  minAge: Number;
  maxAge: Number;
  requiredEquipment: string;
  duration: Number;

  constructor(
    id: Number,
    name: string,
    description: string,
    location: string,
    schedule: string,
    startDate: Date,
    endDate: Date,
    category: string,
    capacity: Number,
    price: Number,
    minAge: Number,
    maxAge: Number,
    requiredEquipment: string,
    duration: Number
  ) {
      this.id=id;
      this.name=name;
      this.description=description;
      this.location=location;
      this.schedule=schedule;
      this.startDate=startDate;
      this.endDate=endDate;
      this.category=category;
      this.capacity=capacity;
      this.price=price;
      this.minAge=minAge;
      this.maxAge=maxAge;
      this.requiredEquipment=requiredEquipment;
      this.duration=duration;
  }
}
