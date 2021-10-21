import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Candlee';
  lang = '';
  token: string = '';
  constructor(translate: TranslateService,
              private router:Router) {
      this.token = localStorage.getItem('token') || '';

      if(this.token !== '')
        this.router.navigateByUrl('/main');
      else
        this.router.navigateByUrl('/');
      

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.lang = localStorage.getItem('lang') || 'en';
      translate.use(this.lang);

  }
}
