const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

export const hash = async (text: string, saltRounds = SALT_ROUNDS) => {
  return await bcrypt.hash(text, saltRounds);
}

export const checkHash = async (text: string, hashedText: string) => {
  return await bcrypt.compare(text, hashedText);
}