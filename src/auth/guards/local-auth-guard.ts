import {
    BadRequestException,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(
      context: ExecutionContext,
    ): Observable<boolean> | Promise<boolean> | boolean {
      return super.canActivate(context);
    }
  
    handleRequest(err, user, _, context) {
      const request = context.switchToHttp().getRequest();
      const { email, password } = request.body;
  
      if (!email || !password) {
        throw new BadRequestException('E-mail e senha são exigidos!');
      }
  
      if (err || !user) {
        throw new UnauthorizedException('E-mail ou senha inválidos!');
      }
  
      return user;
    }
  }
  