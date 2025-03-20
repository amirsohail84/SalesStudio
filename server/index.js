const bcrypt = require("bcryptjs");

async function hashPassword() {
  const password = "admin";
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);
}

hashPassword();
