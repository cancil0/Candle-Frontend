import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { LikePostRequest } from 'src/app/models/like/likePostRequest.model';
import { GetPostByUserNameDto } from 'src/app/models/user/getPostByUserNameDto.model';
import { Post } from 'src/app/models/user/post.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { LikeService } from 'src/app/services/likeService/like.service';
import { PostService } from 'src/app/services/postService/post.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-main-center',
  templateUrl: './main-center.component.html',
  styleUrls: ['./main-center.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class MainCenterComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
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
  likePostRequest:LikePostRequest = {
    postId:'',
    userId:this.userService.userId
  }
  constructor(private postService : PostService,
              private dialogService : DialogService,
              private userService: UserService,
              private likeService : LikeService) { }

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

  likePost(button:MatButton, postId: string){
    this.likePostRequest.postId = postId;
    if(button.color !== 'warn'){
      button.color = 'warn';
      this.likeService.likePost(this.likePostRequest).subscribe((result) => {
        if(result.isSuccess){
          this.posts.find(x => x.id == postId)?.likes.push({isLiked:true, userName:this.userService.userName});
        }
      });

    }else{
      button.color = undefined;
      this.likeService.stopLikePost(this.likePostRequest).subscribe((result) => {
        if(result.isSuccess){
          var likes = this.posts.find(x => x.id == postId)?.likes
          let index = -1;
          index = likes!.findIndex(x => x.userName === this.userService.userName);
          if(index !== -1)
            this.posts.find(x => x.id == postId)?.likes.splice(index, 1)
        }
      });
    }
  }

  isLiked(postId: string): boolean{
    var post = this.posts.find(x => x.id == postId);
    let index = post?.likes.findIndex(x => x.userName == this.userService.userName);

    if(index === -1){
      return false;
    }

    return true;
  }

  expandComment(expansionPanel:MatExpansionPanel){
    if(expansionPanel.expanded)
      expansionPanel.close();
    else
      expansionPanel.open();
  }

  getRouter(userName:string) : string{
    return '/profile/' + userName
  }

}
