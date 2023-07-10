const mongoose = require('mongoose');

const menuSchema =mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});

const restaurantSchema =mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [menuSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;