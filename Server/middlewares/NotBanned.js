module.exports = async function notBanned(req, res, next){

  if(req.user.status !== "active") {

    next({ name: "Forbidden", message: "You can not borrow our book for the time being"})
    return
  }
  next()
}