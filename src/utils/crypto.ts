import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

export const hash = async (
  text: string,
  saltRounds = SALT_ROUNDS,
): Promise<string> => {
  return bcrypt.hash(text, saltRounds);
};

export const checkHash = async (
  text: string,
  hashedText: string,
): Promise<Boolean> => {
  return bcrypt.compare(text, hashedText);
};
