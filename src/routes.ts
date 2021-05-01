import { UserController, TokenController } from './controller';
import { verifyJWT } from './middlewares/auth-middleware';

export const Routes = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
    middlewares: [verifyJWT],
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
    middlewares: [verifyJWT],
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
    middlewares: [verifyJWT],
  },
  {
    method: 'post',
    route: '/token',
    controller: TokenController,
    action: 'create',
  },
  {
    method: 'delete',
    route: '/token',
    controller: TokenController,
    action: 'invalidate',
    middlewares: [verifyJWT],
  },
];
