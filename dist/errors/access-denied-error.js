"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = void 0;
class AccessDeniedError extends Error {
    constructor() {
        super('Access Denied');
        this.code = 403;
        this.description = 'Access Denied Error';
    }
}
exports.AccessDeniedError = AccessDeniedError;
//# sourceMappingURL=access-denied-error.js.map