// https://api.nytimes.com/svc/books/v3/lists/current/young-adult.json?api-key=NTa5GkQ1SMWf9FRbGbvbZLyUBgfiaM2h
// https://api.nytimes.com/svc/books/v3/lists/current/childrens-middle-grade-e-book.json?api-key=NTa5GkQ1SMWf9FRbGbvbZLyUBgfiaM2h
// https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=NTa5GkQ1SMWf9FRbGbvbZLyUBgfiaM2h
// https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=NTa5GkQ1SMWf9FRbGbvbZLyUBgfiaM2h

const { signToken } = require("../helpers/jwt")
const { User } = require("../models")
const bcrypt = require("bcrypt")



module.exports = class UserController {

  static async register(req, res, next){

    const {fullName, email, password, role} = req.body

    try {
      await User.create(
        { fullName,
          email,
          password,
          role
        }
      )
      res.status(201).json({message: "Register Success"})
      
    } catch (error) {
      console.log(error);
      next()
    }
  }

  static async login(req, res, next){
    const {email, password} = req.body

    if(!email){
      res.status(400)
      return
    }
    if(!password){
      res.status(400)
      return
    }

    try {

      const user = await User.findOne({where: {email}})

      if(!user){
        res.status(401)
        return
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if(!isValidPassword){
        res.status(401)
        return
      }

      const access_token = signToken({id: user.id})

      res.status(200).json({access_token})
    } catch(error){
      console.log(error);
      next()
    }
  }
}
