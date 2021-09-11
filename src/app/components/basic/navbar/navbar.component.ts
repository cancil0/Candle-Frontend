import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/user/post.model';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogin:boolean = false;
  selectedLang: string = '';
  isSideBarOpen: boolean = false;
  posts : Post[] = [];
  languages: any[] = [
    { "code": "tr", "description": "Türkçe" },
    { "code": "en", "description": "English" }
  ];

  constructor(private auth:AuthenticationService,
              private router:Router,
              private post : PostService) { }

  ngOnInit(): void {
    this.selectedLang = localStorage.getItem('lang') || 'en';
    this.getAllPosts();
    this.isLogin = this.auth.isLogin();
  }
  
  async getAllPosts(){
    this.posts = await this.post.getAllPosts();
    console.log(this.post);
  }

  selectLang(value: any) {
    if (value === localStorage.getItem('lang'))
      return

    localStorage.setItem('lang', value);
    window.location.reload();
  }

  logOut(){
    this.auth.logout();
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
    
  }

}
