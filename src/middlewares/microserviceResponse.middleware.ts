import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class MicroserviceResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        if (response.status >= 100 && response.status < 400) {
          context.switchToHttp().getResponse().status(response.status);
          return response.data;
        }

        if (response.status >= 400 && response.status < 500) {
          throw new HttpException(response.data.message, response.status);
        }

        throw new HttpException(
          'Unexpected response from cats-service',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          throw err;
        }
        throw new HttpException(
          err.message || 'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
