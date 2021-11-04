import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  token: string = '';
  language: string = '';
  
  constructor() {}

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
    window.location.reload();
  }

}