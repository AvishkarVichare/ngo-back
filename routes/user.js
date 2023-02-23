const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

router.post('/login', async(req, res)=>{
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      const token = jwt.sign(
        payload,
       'shhh'
      );

      res.status(200).json(token)
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  
})

module.exports = router;

router.post('/signUp', async(req, res)=>{
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = await User.create({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      if(email.includes('admin')) user.role = 'admin'


         await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      const token = jwt.sign(
        payload,
       'shhh'
      );

      res.status(200).json(token)
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  
})