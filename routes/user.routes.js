const express=require("express")
const router=express.Router()
const bcrypt=require('bcrypt');
const User=require("../models/user")
const jwt=require("jsonwebtoken")


router.post("/api/register",async(req,res)=>{
    const {name,email,password,address:{street,city,state,country,zip}}=req.body
    try {
        const userexit=await User.findOne({email})
        if(userexit){
            res.send("user already exists")
        }
        const hash=bcrypt.hashSync(password,8)
        const user =new User({name,email,password:hash,address:{street,city,state,country,zip}})
        await user.save()
        res.send({user})
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
})

router.post("/api/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            res.send("invalid email")
        }
        const passmatch=await bcrypt.compareSync(password,user.password)
        if(!passmatch){
            res.send("invalid passwort")
        }
        const token=jwt.sign({userId:user._id},"mock")
       
        res.send({token})
      
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
})

router.put('/api/user/:id/reset', async (req, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
  
      
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid current password' });
      }
  
 
      const hashedPassword = await bcrypt.hash(newPassword, 8);
  
    
      user.password = hashedPassword;
      await user.save();
  
     
      res.sendStatus(204);
    } catch (error) {
   
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports=router