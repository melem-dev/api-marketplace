function encode(text) {
  return Buffer.from(text).toString("base64");
}

function decode(hash) {
  return Buffer.from(hash, "base64").toString("ascii");
}

module.exports = {
  encode,
  decode,
};
