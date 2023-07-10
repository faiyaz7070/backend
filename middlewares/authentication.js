const jwt = require('jsonwebtoken');
const User=require("../models/user")
const {blacklist}=require("../models/blacklist")

const authMiddleware = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(blacklist.includes(token)){
      res.send('please log in again')
    }
    const decodedToken = jwt.verify(token, "mock");
    const { userId } = decodedToken;

  
    const user = await User.findById(userId);
    if (!user) {
       res.json({ message: 'Unauthorized' });
    }

  
    req.user = user;

    next();
  } catch (error) {
   res.json({ message: 'Unauthorized',err:error.message});
  }
};

module.exports = authMiddleware;