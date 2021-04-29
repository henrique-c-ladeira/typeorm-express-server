interface newUser {
  name: string
  email: string
  password: string
  phone: string
  birthday: Date
}

interface IUser extends newUser {}

interface safeUser extends Omit<newUser, 'password'> {}