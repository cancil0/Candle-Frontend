import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  token: string = '';
  language: string = '';
  
  constructor(private translateService:TranslateService) {}

  async setToken(tokenData:string) {
    localStorage.setItem('token', tokenData);
    this.token = tokenData;
  }

  async removeToken(){
    localStorage.removeItem('token');
    this.token = '';
  }

  async setLanguage(langCode:string) {
    if(this.language === langCode)
      return;

    localStorage.setItem('lang', langCode);
    this.language = langCode;
    this.translateService.use(langCode)
  }

}