export class AccessDeniedError extends Error {
  code: number;
  description: string;

  constructor() {
    super('Access Denied');
    this.code = 403;
    this.description = 'Access Denied Error';
  }
}
