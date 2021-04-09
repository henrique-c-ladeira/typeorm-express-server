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
exports.logger = void 0;
const logger = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.headersSent) {
        console.log('\x1b[36m%s\x1b[0m \x1b[43m\x1b[30m%s\x1b[0m', res.statusCode, req.method, req.url, req.connection.remoteAddress);
    }
    else {
        res.on('finish', function () {
            console.log('\x1b[36m%s\x1b[0m \x1b[43m\x1b[30m%s\x1b[0m', res.statusCode, req.method, req.url, req.connection.remoteAddress);
        });
    }
    next();
});
exports.logger = logger;
//# sourceMappingURL=logger-middleware.js.map