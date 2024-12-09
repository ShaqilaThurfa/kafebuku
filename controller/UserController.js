const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const {OAuth2Client} = require('google-auth-library');

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

  static async googleLogin(req, res, next) {
    const { token } = req.headers;
    const client = new OAuth2Client();
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleClientId
      });
      const payload = ticket.getPayload();
      console.log(payload);
      
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          fullName: payload.name,
          email: payload.email,
          Password: 'password-google',
        },
        hooks: false,
      });
      const access_token = signToken({ id: user.id, email: user.email });
      return res.status(200).json({ access_token });
    } catch (err) {
      console.log(err)
      next(err);
    }
  
}

}