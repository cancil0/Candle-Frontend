import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Candlee';
  lang = '';
  constructor(translate: TranslateService,
              private auth:AuthenticationService,
              private router:Router) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.lang = localStorage.getItem('lang') || 'en';
      translate.use(this.lang);

      let user = localStorage.getItem('user')
      if (typeof user !== 'undefined' && user !== null && auth.userValue == null) {
        auth.userSubject.next(JSON.parse(user));
        this.router.navigateByUrl('/main')
      }else{
        this.router.navigateByUrl('/login')
      }
  }
}
