import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  token: string = '';
  language: string = localStorage.getItem('lang') || '';
  
  constructor() { 
    this.setLanguage('tr');
  }

  setToken(tokenData:string) {
    localStorage.setItem('token', tokenData);
    this.token = tokenData;
  }

  removeToken(){
    localStorage.removeItem('token');
    this.token = '';
  }

  setLanguage(langCode:string) {
    if(this.language === langCode)
      return;

    localStorage.setItem('lang', langCode);
    this.language = langCode;
    window.location.reload();
  }

}