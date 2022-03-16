const { MClient, MEmployee } = require("../models");

module.exports = (role) => {
  return async (req, res, next) => {
    try {
      const { user } = req.user;

      if (!user) return res.status(401).json({ err: "permission denied" });

      let userType = await MEmployee.findOne({ userId: user });

      if (!userType) {
        userType = await MClient.findOne({ userId: user });

        if (!userType) {
          return res.status(401).json({ err: "user not found" });
        }

        req.user.type = "client";
      } else {
        req.user.type = "employee";
      }

      if (role !== req.user.type) {
        return res.status(401).json({ err: "permission denied" });
      }

      return next();
    } catch (error) {
      return res.status(500).json({ err: "internal server error" });
    }
  };
};
