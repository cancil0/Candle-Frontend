import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService:AuthenticationService){}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        
        const user = this.authService.userValue;
        const isLoggedIn = user && user.access_token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
          request = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${user.access_token}`
            }
          })
        }
        return next.handle(request);
      }
}