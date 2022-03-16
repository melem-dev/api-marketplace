const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY || "MySecretKey";
const JWT_OPTIONS = { expiresIn: "24h" };

function create(payload) {
  return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
}

function decode(token) {
  try {
    if (!token) throw Error("token must be declared");

    const [hashType, hash] = token.split(" ");

    if (!hash) throw Error("token must be declared");

    if (hash.split(".").length !== 3) throw Error("invalid token");

    const data = jwt.verify(hash, JWT_SECRET, (err, data) => {
      if (err) throw Error(err);

      return data;
    });

    return { status: true, data };
  } catch (error) {
    return { status: false, error: error.message };
  }
}

module.exports = {
  create,
  decode,
};
