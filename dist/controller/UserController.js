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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
/* eslint-disable no-unreachable */
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const helpers_1 = require("../helpers");
const errors_1 = require("../errors");
class UserController {
    constructor() {
        this.userRepository = typeorm_1.getRepository(entity_1.User);
        this.all = helpers_1.catchError((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find();
            const safeUsers = users.map((elem) => {
                const { password, id } = elem, safeUser = __rest(elem, ["password", "id"]);
                return safeUser;
            });
            response.status(200).send(safeUsers);
        }));
        this.one = helpers_1.catchError((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(request.params.id);
            if (!user)
                throw new errors_1.BadRequestError();
            const { password } = user, safeUser = __rest(user, ["password"]);
            response.status(200).send(safeUser);
        }));
        this.save = helpers_1.catchError((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phone, birthday } = request.body;
            if (!(name && email && password && phone && birthday)) {
                throw new errors_1.BadRequestError();
            }
            const hashedPassword = yield helpers_1.hash(password);
            const newUser = {
                name,
                email,
                password: hashedPassword,
                phone,
                birthday
            };
            try {
                yield this.userRepository.save(newUser);
            }
            catch (_a) {
                throw new Error('could not save to database');
            }
            response.status(200).send({ name: newUser.name, email: newUser.email, phone: newUser.phone, birthday: newUser.birthday });
        }));
        this.remove = helpers_1.catchError((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userToRemove = yield this.userRepository.findOne(request.params.id);
            if (userToRemove == null) {
                throw new errors_1.BadRequestError();
            }
            response.sendStatus(204);
        }));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map