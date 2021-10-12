import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogin:boolean = false;
  selectedLang: string = '';
  isSideBarOpen: boolean = false;
  
  languages: any[] = [
    { "code": "tr", "description": "Türkçe" },
    { "code": "en", "description": "English" }
  ];

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.selectedLang = localStorage.getItem('lang') || 'en';
  }
  
  selectLang(value: any) {
    if (value === localStorage.getItem('lang'))
      return

    localStorage.setItem('lang', value);
    window.location.reload();
  }

  share(){
  }

  logOut(){
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
    
  }

}
