module.exports = (msg) => {
  const hour = new Date().toLocaleString("pt-br").split(" ")[1];
  console.log(`[${hour}] ${msg}`);
};
