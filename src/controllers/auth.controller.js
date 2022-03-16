const bcrypt = require("bcrypt");
const { MUser } = require("../models");
const { b64, jwt } = require("../utils");

async function Login(req, res) {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(400).json({ err: "bad credentials" });

    const hashDecoded = b64.decode(token.split(" ")[1]);

    const [username, password] = hashDecoded.split(":");

    const user = await MUser.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) return res.status(404).json({ err: "user not found" });

    const matchCredentials = bcrypt.compareSync(password, user.password);

    if (!matchCredentials) {
      return res.status(404).json({ err: "user not found" });
    }

    const authToken = jwt.create({ user: user.id, auth: true });

    return res.status(200).json({ auth: authToken });
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

async function Register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const searchQuery = { $or: [{ username }, { email }] };

    const haveRegister = await MUser.findOne(searchQuery);

    if (haveRegister) return res.status(404).json({ err: "invalid fields" });

    const newUser = await MUser.create({ username, email, password });
    const b64token = b64.encode(`${username}:${password}`);

    req.headers.authorization = "Basic " + b64token;

    return next();
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

module.exports = {
  Login,
  Register,
};
