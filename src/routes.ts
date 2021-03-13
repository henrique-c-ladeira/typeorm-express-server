import {UserController} from "./controller/UserController";
import {TokenController} from "./controller/TokenController";
import {verifyJWT} from './middlewares/auth-middleware';

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middlewares: [verifyJWT]
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    middlewares: [verifyJWT]
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    middlewares: [verifyJWT]
}, {
    method: "post",
    route: "/token",
    controller: TokenController,
    action: "create"
}, {
    method: "put",
    route: "/token",
    controller: TokenController,
    action: "extends",
    middlewares: [verifyJWT]
}, {
    method: "delete",
    route: "/token/:id",
    controller: TokenController,
    action: "remove",
    middlewares: [verifyJWT]
}, ];