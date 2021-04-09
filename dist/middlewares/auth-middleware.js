"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const typeorm_1 = require("typeorm");
const jwt = __importStar(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const entity_1 = require("../entity");
const errors_1 = require("../errors");
const helpers_1 = require("../helpers");
exports.verifyJWT = helpers_1.catchError((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token)
        throw new errors_1.UnauthorizedError();
    try {
        const decoded = yield jwt.verify(token, process.env.JWT_PRIVATE);
        req.userId = decoded.id;
    }
    catch (_a) {
        throw new errors_1.UnauthorizedError();
    }
    // Check if token is invalidated
    const tokenRepository = typeorm_1.getRepository(entity_1.Token);
    const invalidatedToken = yield tokenRepository.findOne({ id: token });
    if (!lodash_1.default.isEmpty(invalidatedToken)) {
        throw new errors_1.AccessDeniedError();
    }
    req.token = token;
    next();
}));
//# sourceMappingURL=auth-middleware.js.map