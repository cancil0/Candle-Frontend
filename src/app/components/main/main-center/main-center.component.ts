import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { GetPostByUserNameDto } from 'src/app/models/user/getPostByUserNameDto.model';
import { Post } from 'src/app/models/user/post.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { PostService } from 'src/app/services/postService/post.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-main-center',
  templateUrl: './main-center.component.html',
  styleUrls: ['./main-center.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class MainCenterComponent implements OnInit {

  isLike:boolean = false;
  posts : Post[] = [];
  isAddComent:boolean = false;
  scrollCount:number = 0;
  isLastRequest:boolean = false;
  getPostByUserNameDto:GetPostByUserNameDto ={
    userName:'',
    scrollCount:0,
    takeCount:3
  }
  constructor(private postService : PostService,
              private dialogService : DialogService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
    this.getPostByUserNameDto.userName = this.userService.userName;
    this.getPostByUserNameDto.scrollCount = this.scrollCount;
    this.postService.getMainPost(this.getPostByUserNameDto).subscribe((res) => {
      if(res.isSuccess){
        if(res.data.length > 0){
          this.scrollCount++;
          this.posts.push(...res.data);
        }else{
          this.isLastRequest = true
        }
      }
      else{
        this.dialogService.open('error',res.message);
      }
    });
  }

  addComment(){
 
  }

  loadMore(){
    this.getAllPosts();
  }

}
