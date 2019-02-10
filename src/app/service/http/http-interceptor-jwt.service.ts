import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorJWTService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const username = this.authenticationService.getAuthenticatedUser();
    const token = this.authenticationService.getAuthenticatedToken();
    if (username && token) {
      request = request.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      });
    }
    return next.handle(request);
  }
}
