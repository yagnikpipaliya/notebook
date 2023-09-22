const jwt = require("jsonwebtoken");
const JWT_SECRET = "!@#$%^&*()_+";

const fetchuser = (req, res, next) => {
  //get user from jwt token add id to req obj
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No authentication token provided" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = fetchuser;
