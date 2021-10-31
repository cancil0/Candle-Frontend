import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
              private userService:UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    if(this.token !== ''){
      this.isLogin = true;
      this.userNameSurName = this.userService.userNameSurname;
    }
  }
  
  selectLang(value: any) {
    if (value === localStorage.getItem('lang'))
      return

    localStorage.setItem('lang', value);
    window.location.reload();
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
    
  }

}
