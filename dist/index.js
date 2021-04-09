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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const server_1 = __importDefault(require("./server"));
dotenv_1.config();
// eslint-disable-next-line no-void
void (() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // create db connection
    yield typeorm_1.createConnection();
    // start express server
    server_1.default.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000, () => console.log('Oh GEE I\'m up.'));
}))();
//# sourceMappingURL=index.js.map