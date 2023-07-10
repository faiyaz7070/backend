const expres=require("express") 
const Order=require("../models/order")
const router=expres.Router()
const User=require("../models/user")
const Restaurant=require("../models/restaurant")




router.post('/api/orders', async (req, res) => {
    try {
      const { user, restaurant, items, totalPrice, deliveryAddress,status } = req.body;
  
      const existingUser = await User.findById(user);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
     
      const existingRestaurant = await Restaurant.findById(restaurant);
      if (!existingRestaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
 
      const order = new Order({
        user,
        restaurant,
        items,
        totalPrice,
        deliveryAddress,
        status
      });
  

      await order.save();
  
     
      res.status(201).json(order);
    } catch (error) {
      // Handle error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/api/orders/:id', async (req, res) => {
    try {
      const orders = await Order.findById(req.params.id);
      if (!orders) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(orders);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  router.patch('/api/orders/:id', async (req, res) => {
    const {id}=req.params
    const body=req.body;
    try {
      const orders = await Order.findByIdAndUpdate({_id:id},body);
      if (!orders) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(orders);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  module.exports=router