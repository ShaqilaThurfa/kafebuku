const { User } = require("../models");


module.exports = class AdminController {
  static async addAdmin(req, res, next) {
    const { fullName, email, Password, status } = req.body;

    try {
      await User.create({
        fullName,
        email,
        role: "Admin",
        Password,
        status,
      });

      res.status(201).json({ message: "Adding admin to this page" });
    } catch (error) {
      console.log(error);

      next(error);
      
    }
  }

  static async getUsers(req, res, next) {
    
    try {
      const users = await User.findAll();

      res.status(201).json(users);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async banned(req, res, next) {
    const  id  = req.params.id;
   
    try {
      // console.log(req.user.id, "ini apa");

      // console.log(id, 'ini id yang dibanned');
      
     

      const user = await User.findByPk(id);
      // console.log(user);
      if(id == req.user.id){
        throw { name: "Forbidden", message: "You can't ban yourself" }
      }

      console.log(user.status, 'dapet ga');
      
      if(user.status === "banned"){
        throw { name: "Forbidden", message: "You already banned this user" };
      }
      
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }

      console.log("status orang",req.user.status);
    

      await user.update({status: "banned"});
      
      await user.save()


      res.status(200).json({ message: `User with ID ${id} has been banned successfully.` });

    } catch (error) {
      console.error(error);
      next(error)
    }
  }

  static async Unbanned(req, res, next) {
    const  id  = req.params.id;
    try {

      const user = await User.findByPk(id);
      // console.log(user);
      
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }

      await user.update({status: "active"});
      await user.save()


      res.status(200).json({ message: `User with ID ${id} has been banned successfully.` });

    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  }

  static async removeUser(req, res, next) {
    console.log('ini id user',req.params.id);
    
    const  id = req.params.id
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }
      await user.destroy();
      res.status(200).json({ message: `User with ID ${id} has been removed successfully.` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
