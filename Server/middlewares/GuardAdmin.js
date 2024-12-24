module.exports = async function guardAdmin(req, res, next){

  if(req.user.role !== "Admin" || req.user.role !== "admin") {

    next({ name: "Forbidden", message: "You are not authorized"})
    return
  }

  // console.log("disini",req.user.role);
  next()
}