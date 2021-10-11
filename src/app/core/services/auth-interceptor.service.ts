import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req);
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'token'),
    });
    return next.handle(modifiedRequest);
  }
}
