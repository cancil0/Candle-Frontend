import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogin:boolean = false;
  token: string = '';
  userNameSurName:string = '';

  languages: any[] = [
    { "code": "tr", "description": "Türkçe" },
    { "code": "en", "description": "English" }
  ];

  constructor(private router:Router,
              private userService:UserService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.token = this.localStorageService.token;
    if(this.token !== ''){
      this.isLogin = true;
      this.userNameSurName = this.userService.userNameSurname;
    }
  }
  
  selectLang(value: any) {
    if (value === this.localStorageService.language)
      return

    this.localStorageService.setLanguage(value)
  }

  logOut(){
    this.localStorageService.removeToken();
    this.router.navigateByUrl('/login')
    window.location.reload();

  }

}
