const protect = require("./authMIddleware");

const isAdmin = (req, res, next) => {
  protect(req, res, (err) => {
    if (err) {
      return next(err);
    }

    if (req.user.role === "admin") {
      return next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
  });
};

module.exports = isAdmin;
