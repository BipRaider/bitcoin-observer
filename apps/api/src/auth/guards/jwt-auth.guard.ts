import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const route = context.getHandler().name;

    // Allow users to visit this routes without JWT
    const jwtRouteWhitelist = ['login', 'register'];

    if (jwtRouteWhitelist.includes(route)) return true;

    return super.canActivate(context);
  }
}
