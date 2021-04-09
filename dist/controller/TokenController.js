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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const typeorm_1 = require("typeorm");
const jwt = __importStar(require("jsonwebtoken"));
const entity_1 = require("../entity");
const helpers_1 = require("../helpers");
const errors_1 = require("../errors");
class TokenController {
    constructor() {
        this.userRepository = typeorm_1.getRepository(entity_1.User);
        this.tokenRepository = typeorm_1.getRepository(entity_1.Token);
        this.create = helpers_1.catchError((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            if (!(email && password))
                throw new errors_1.BadRequestError();
            const userToValidate = yield this.userRepository.findOneOrFail({ email: email });
            const isAutenticated = yield helpers_1.checkHash(password, userToValidate.password);
            if (!isAutenticated) {
                throw new errors_1.UnauthorizedError();
            }
            const newToken = jwt.sign({ id: userToValidate.id }, process.env.JWT_PRIVATE, { expiresIn: '1h' });
            response.status(200).send({ username: userToValidate.name, jwt: newToken });
        }));
        this.invalidate = helpers_1.catchError((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const invalidatedToken = { id: request.token };
            try {
                yield this.tokenRepository.save(invalidatedToken);
            }
            catch (_a) {
                throw new Error('could not save to database');
            }
            response.sendStatus(204);
        }));
    }
}
exports.TokenController = TokenController;
//# sourceMappingURL=TokenController.js.map