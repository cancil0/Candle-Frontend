import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    token:string = this.localStorageService.token
    language:string = '';
    constructor(private localStorageService:LocalStorageService,
                private translateService:TranslateService,
                private dialogService: DialogService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.language = this.translateService.currentLang
        if(this.language === 'tr')
            this.language = 'tr-TR' 
        else
            this.language = 'en-US'

        if (this.token) {
            request = request.clone({
                setHeaders: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': `Bearer ${this.token}`,
                'Accept-Language': `${this.language}`
                }
            });
        }

        return next.handle(request).pipe( tap((res:any) => {
            if(res instanceof HttpResponse){
                if(!res.ok){
                    this.dialogService.open('error', 'Common.Exception.Error')
                }
            }
        },
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
            this.dialogService.open('error', 'Common.Exception.Error')
        }
        }));
    }
}