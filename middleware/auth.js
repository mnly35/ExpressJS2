const jwt = require("jsonwebtoken");
const env = require("dotenv/config");
module.exports = function (req, res, next) {
  //Check Token in the Header
  const token = req.header("authorization");
  if (!token) {
    //401 means that user not autohorizate
    return res.status(401).json({ errors: "No Token,Authorization is denied" });
  }
  try {
    //Verify Token
    const payload = jwt.verify(token, process.env.SECRETKEY);
    req.username = payload.username;
    next();
  } catch (error) {
    return res.status(401).json({ errors: "Authorization is denied." });
  }
};
