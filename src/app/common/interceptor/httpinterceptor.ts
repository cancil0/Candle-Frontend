import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    token:string = this.localStorageService.token

    constructor(private localStorageService:LocalStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token) {
            request = request.clone({
                setHeaders: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': `Bearer ${this.token}`
                }
            });
        }

        return next.handle(request).pipe( tap((res:any) => {
            //if(res instanceof HttpResponse)
        },
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
            //return;
            }
        }
        }));
    }
}