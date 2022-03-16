const bcrypt = require("bcrypt");
const { MUser, MClient, MEmployee } = require("../models");
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
    const { username, email, password, type } = req.body;

    const searchQuery = { $or: [{ username }, { email }] };

    const haveRegister = await MUser.findOne(searchQuery);

    if (haveRegister) return res.status(404).json({ err: "invalid fields" });

    const newUser = await MUser.create({
      username,
      email,
      password,
      type: type || 0,
    });

    if (newUser.type === 0) {
      await MClient.create({ userId: newUser.id });
    } else if (newUser.type === 1) {
      await MEmployee.create({ userId: newUser.id });
    } else {
    }

    const b64token = b64.encode(`${username}:${password}`);

    req.headers.authorization = "Basic " + b64token;

    return next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: "internal server error" });
  }
}

async function GetUser(req, res) {
  try {
    const users = await MUser.find();
    const sendUsers = [];

    for (let x of users) {
      const userType = x.type === 1 ? "employee" : "client";
      const { email } = x;

      sendUsers.push({ email, type: userType });
    }

    return res.status(200).json(sendUsers);
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

async function GetClients(req, res) {
  try {
    const users = await MClient.find();
    const sendUsers = [];

    for (let x of users) {
      const { email, type } = await MUser.findById(x.userId);
      const userType = type === 1 ? "employee" : "client";

      sendUsers.push({ email, type: userType });
    }

    return res.status(200).json(sendUsers);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ err: "internal server error" });
  }
}

async function GetEmployees(req, res) {
  try {
    const users = await MEmployee.find();
    const sendUsers = [];

    for (let x of users) {
      const { email, type } = await MUser.findById(x.userId);
      const userType = type === 1 ? "employee" : "client";

      sendUsers.push({ email, type: userType });
    }

    return res.status(200).json(sendUsers);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ err: "internal server error" });
  }
}

module.exports = {
  Login,
  Register,
  GetUser,
  GetClients,
  GetEmployees,
};
