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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const routes_1 = require("./routes");
const logger_middleware_1 = require("./middlewares/logger-middleware");
const app = express_1.default();
app.use(bodyParser.json());
// register express routes from defined application routes
routes_1.Routes.forEach(route => {
    var _a;
    app[route.method](route.route, logger_middleware_1.logger, (_a = route.middlewares) !== null && _a !== void 0 ? _a : [], (req, res, next) => {
        const result = (new route.controller())[route.action](req, res, next);
        result
            .then(result => {
            return result !== null && result !== undefined ? res.send(result) : undefined;
        })
            .catch(err => res.status(500).send(err));
    });
});
// Dynamically apply all routes
// Routes.forEach((route) => {
//   app[route.method](
//     route.route,
//     route.middlewares,
//     (
//       request: Request,
//       response: Response,
//       next: NextFunction
//     ) => {
//       (route.controller as any)[route.action](request, response, next)
//         .then((result) => next(result))
//         .catch((err) => next(err));
//     }
//   );
// });
exports.default = app;
//# sourceMappingURL=server.js.map