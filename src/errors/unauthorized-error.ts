export class UnauthorizedError extends Error {
  code: number;
  description: string;

  constructor() {
    super('Unauthorized');
    this.code = 401;
    this.description = 'Unauthorized Error';
  }
}
