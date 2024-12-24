module.exports = async function guardAdmin(req, res, next){

  if(req.user.role !== "Admin") {

    next({ name: "Forbidden", message: "You are not authorized"})
    return
  }

  // console.log("disini",req.user.role);
  next()
}