export class BadRequestError extends Error {
  code: number;
  description: string;

  constructor() {
    super('Bad Request');
    this.code = 400;
    this.description = 'Bad Request Error';
  }
}
