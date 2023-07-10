const express=require("express")
const resrouter=express.Router()
const Restaurant=require("../models/restaurant")





resrouter.get('/api/restaurants', async (req, res) => {
    try {
     
      const restaurants = await Restaurant.find();
  
  
      res.status(200).json(restaurants);
    } catch (error) {
  
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  resrouter.get('/api/restaurants/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
   
      const restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
    
      res.status(200).json(restaurant);
    } catch (error) {
    
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  resrouter.get('/api/restaurants/:id/menu', async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(restaurant.menu);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

 resrouter.post('/api/restaurants', async (req, res) => {
    try {
      const restaurant = new Restaurant(req.body);
     await restaurant.save();
      res.status(201).json(restaurant);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  resrouter.post('/api/restaurants/:id/menu', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, image } = req.body;
  
      const restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
     restaurant.menu.push({name,description,price,image});
      await restaurant.save();
  
  
      res.status(201).json(restaurant);
    } catch (error) {
      // Handle error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 resrouter.delete('/api/restaurants/:id/menu/:menuid', async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      const item= req.params.menuid;
      const Index = restaurant.menu.findIndex(menu => menu._id == item);
  
      if (Index === -1) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
  
      restaurant.menu.splice(Index, 1);
      await restaurant.save();
  
      res.json(restaurant.menu);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  module.exports=resrouter