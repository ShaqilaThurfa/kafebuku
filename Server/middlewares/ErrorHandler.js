module.exports = function errorHandler(error, req, res, next) {
  console.log(error.name);
  
  switch (error.name) {
    
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      // const errors = error.errors.map((value) => value.message);
      console.log("di error handler",error.errors[0].message);
      res.status(400).json({ message: error.errors[0].message});
      break;
    case "BadRequest":
      res.status(400).json({ message: error.message });
      break;
    case "Unauthorized":  
      res.status(401).json({ message: error.message });
      break;
    case "Forbidden":
      res.status(403).json({ message: error.message });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "NotFound":
      res.status(404).json({ message: "User not found" });
      break;
    default:
      console.error(error);  // Log unexpected errors for debugging
      res.status(500).json({ message: "Internal Server Error" });
  }
}
