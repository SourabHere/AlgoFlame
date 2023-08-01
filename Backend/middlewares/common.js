const jwt = require("jsonwebtoken");
const {User} = require("../models/models");

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = `Bearer ${req.cookies["access-token"]}`;
    // console.log(authHeader);

    if (!authHeader)
      return res.status(400).json({ error: 'Auth token required' });

    let token = authHeader.split(' ');
    if (!token[1]) return res.status(400).json({ error: 'Invalid auth token' });

    token = token[1];


    const user = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_COMMON_SECRET, (err, payload) => {
        if (err) reject(err);
        else resolve(payload);
      });
    });

    // console.log(user);

    const savedUser = await User.findOne({
        email: user.email,
    });

    if (!savedUser){
        
      return res.status(400).json({ error: 'You are not authorized' });
    }

    // console.log(savedUser);

    req.user = {
      "_id": user._id,
      "name": user.name,
      "email": user.email,
      "role": savedUser.role
    };
    return next();
  } catch (err) {
    
    if (err instanceof jwt.JsonWebTokenError){
      return res.status(401).json({ error: err.message });
    }

    return res.status(500).send('Internal Server Error');
  }
};

module.exports = verifyUser;