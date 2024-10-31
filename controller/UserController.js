const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async register(req, res, next) {
    const { fullName, email, Password, role, status } = req.body;
    console.log(req.body);
    
    try {
      await User.create({
        fullName,
        email,
        Password,
        role,
        status
      });
      
      // res.send('Hello World!')
      res.status(201).json({ message: "Register Success" });

      
      
    } catch (error) {
      // console.log('sampe sini',error.errors[0].message);
      next(error);
      // res.status(400).json({ message: error.errors[0].message });
      
    }
  }

  static async login(req, res, next) {
    const { email, Password } = req.body;


    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!Password) {
      return res.status(400).json({ message: "Password is required" });
    }

    try {
      const user = await User.findOne({ where: { email } });


      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }


      const isValidPassword = await bcrypt.compare(Password, user.Password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }


      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next();
    }
  }
};
