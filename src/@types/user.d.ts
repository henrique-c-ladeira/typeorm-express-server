/// <reference path="./user.d.ts" />
export declare interface newUser {
  name: string
  email: string
  password: string
  phone: string
  birthday: Date
}

export declare interface safeUser extends Omit<newUser, 'password'> {}
