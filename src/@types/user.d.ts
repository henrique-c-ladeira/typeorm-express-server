declare interface newUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
}

declare interface safeUser extends Omit<newUser, 'password'> {}

interface credentials {
  email: string;
  password: string;
}
