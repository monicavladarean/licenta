const date = require('date-and-time')

function Camp(id, name, description, location, schedule, startDate, category, capacity, price, minAge, maxAge, requiredEquipment, duration) {
    this.id = id,
    this.name = name, 
    this.description = description, 
    this.location = location, 
    this.schedule = schedule,
    this.startDate = startDate.toISOString().split('T')[0],
    this.category = category, 
    this.capacity = capacity,
    this.price = price,
    this.minAge = minAge,
    this.maxAge = maxAge,
    this.requiredEquipment = requiredEquipment,
    this.duration = duration,
    this.endDate = date.addDays(startDate,duration).toISOString().split('T')[0]
  }
  
  module.exports = Camp;
  