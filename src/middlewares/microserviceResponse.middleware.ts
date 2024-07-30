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
        // Se o status está entre 200 e 399, processa normalmente
        if (response.status >= 200 && response.status < 400) {
          context.switchToHttp().getResponse().status(response.status);
          return response.data;
        }

        // Lança exceção para status entre 400 e 499
        if (response.status >= 400 && response.status < 500) {
          throw new HttpException(response.data.message, response.status);
        }

        // Lança exceção para status 500 ou superior
        if (response.status >= 500) {
          throw new HttpException(response.data.message, response.status);
        }

        // Caso o status não se encaixe em nenhum dos casos acima, lança erro genérico
        throw new HttpException(
          'Unexpected response',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          throw err; // Propaga erros já conhecidos
        }
        throw new HttpException(
          err.message || 'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
