import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/user/post.model';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-main-center',
  templateUrl: './main-center.component.html',
  styleUrls: ['./main-center.component.scss']
})
export class MainCenterComponent implements OnInit {

  isLike:boolean = false;
  posts : Post[] = [];
  constructor(private post : PostService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  async getAllPosts(){
    this.posts = await this.post.getAllPosts();
  }

}
