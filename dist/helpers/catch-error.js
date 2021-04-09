"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
// import { UnauthorizedError, AccessDeniedError, BadRequestError } from '../errors';
const catchError = (fnc) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fnc(req, res, next);
    }
    catch (error) {
        const payload = Object.assign({ code: 500 }, error);
        res.status(payload.code).send(Object.assign(Object.assign({}, payload), { message: error.message }));
    }
});
exports.catchError = catchError;
//# sourceMappingURL=catch-error.js.map