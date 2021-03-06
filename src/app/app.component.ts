import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FollowService } from './services/followService/follow.service';
import { LocalStorageService } from './services/localStorageService/local-storage.service';
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
              private userService: UserService,
              private localStorageService:LocalStorageService,
              private followService:FollowService) {

      this.localStorageService.setToken(localStorage.getItem('token') || '');
      this.token = this.localStorageService.token;
      var diffTime = 0;
      if(this.token !== ''){
        this.decodedToken = this.decodeJwt(this.token)
        let convDate = new Date( Date.parse(this.decodedToken.expires));
        diffTime = (convDate.getTime() - this.dateNow.getTime())/(1000*60*60*24)
  
        this.userService.emailChange(this.decodedToken.email);
        this.userService.userIdChange(this.decodedToken.id);
        this.userService.changeUserName(this.decodedToken.userName);
        this.userService.userNameSurnameChange(this.decodedToken.userNameSurname);
        this.followService.getFollowings(this.decodedToken.userName).subscribe((res) => {
          if(res.isSuccess){
            this.followService.setFollowingList(res.data);
          }
        });

        this.followService.getFollowers(this.decodedToken.userName).subscribe((res) => {
          if(res.isSuccess){
            this.followService.setFollowerList(res.data);
          }
        });
      }
      
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.lang = this.localStorageService.language = localStorage.getItem('lang')!;
      this.localStorageService.setLanguage(this.lang, false)
      
      if(this.token !== '' && diffTime > 0){
        this.router.navigateByUrl('/').then(() => {
          this.router.navigate(['/main'])
        });
        
      }else{
        this.router.navigateByUrl('/')
        this.localStorageService.removeToken();
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
