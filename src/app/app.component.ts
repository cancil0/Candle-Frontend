import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/userService/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Candlee';
  lang = '';
  token: string = '';
  decodedToken:any;
  dateNow:Date = new Date();
  constructor(translate: TranslateService,
              private router:Router,
              private userService: UserService) {
      this.token = localStorage.getItem('token') || '';

      var diffTime = 0;
      if(this.token !== ''){
        this.decodedToken = this.decodeJwt(this.token)
        let convDate = new Date( Date.parse(this.decodedToken.expires));
        diffTime = (convDate.getTime() - this.dateNow.getTime())/(1000*60*60*24)
  
        this.userService.emailChange(this.decodedToken.email);
        this.userService.userIdChange(this.decodedToken.id);
        this.userService.userNameChange(this.decodedToken.userName);
        this.userService.userNameSurnameChange(this.decodedToken.userNameSurname);
      }
      
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.lang = localStorage.getItem('lang') || 'en';
      translate.use(this.lang);

      if(this.token !== '' && diffTime > 0){
        this.router.navigateByUrl('/main');
        
      }else{
        this.router.navigateByUrl('/');
        localStorage.removeItem('token');
      }  
  }

  decodeJwt (token:string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
  }

}
