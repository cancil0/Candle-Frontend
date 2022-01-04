import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  token: string = '';
  language: string = '';
  
  constructor(private translateService:TranslateService,
              private adapter: DateAdapter<any>,
              private router: Router) {}

  async setToken(tokenData:string) {
    localStorage.setItem('token', tokenData);
    this.token = tokenData;
  }

  async removeToken(){
    localStorage.removeItem('token');
    this.token = '';
  }

  async setLanguage(langCode:string, checkOldLang:boolean = true) {
    if(this.language === langCode && checkOldLang)
      return;

    this.router.navigateByUrl('/').then(() => {
      localStorage.setItem('lang', langCode);
      this.adapter.setLocale(langCode);
      this.language = langCode;
      this.translateService.use(langCode)
      if(checkOldLang)
        this.router.navigate(['/main'])
    });
    
  }

}