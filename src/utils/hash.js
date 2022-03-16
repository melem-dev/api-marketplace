module.exports = (size, onlyNumbers = false) => {
  let chars = "0123456789";

  if (!onlyNumbers) chars += "abcdefghijklmnopqrstuvwxyz";

  let hash = "";

  for (let x = 0; x < size; x++) {
    hash += chars[Math.floor(Math.random * chars.length)].toUpperCase();
  }

  return hash;
};
