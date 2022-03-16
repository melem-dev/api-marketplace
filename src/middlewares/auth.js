const { jwt } = require("../utils");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw Error();

    const { status, data, error } = jwt.decode(token);

    if (!status) throw Error(error);

    req.user = data;

    return next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ err: "permission denied" });
  }
};
