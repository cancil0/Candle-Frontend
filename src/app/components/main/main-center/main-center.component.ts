import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { AddCommentRequestDto } from 'src/app/models/comment/addCommentRequestDto.model';
import { LikePostRequest } from 'src/app/models/like/likePostRequest.model';
import { Comment } from 'src/app/models/user/comment.model';
import { GetPostByUserNameDto } from 'src/app/models/user/getPostByUserNameDto.model';
import { Post } from 'src/app/models/user/post.model';
import { CommentService } from 'src/app/services/commentService/comment.service';
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
    loggedInUserName:'',
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
              private likeService : LikeService,
              private commentService : CommentService) { }

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

  addComment(postId:string,commentText:any,parentCommentId:string){
    var addCommentRequestDto = new AddCommentRequestDto();
    addCommentRequestDto = {
      postId : postId,
      userId : this.userService.userId,
      parentCommentId : parentCommentId,
      commentText : commentText.value
    }
    
    this.commentService.addComment(addCommentRequestDto).subscribe((result) => {
      if(result.isSuccess){
        let post = this.posts.find(x => x.id === postId);
        let comment = new Comment();
        comment = {
          commentId : result.data.commentId,
          userName : this.userService.userName,
          userProfilePhoto : result.data.userProfilePhoto,
          commentText : commentText.value,
          time : new Date()
        }
        post?.comments.push(comment);
        commentText.value = '';
      }else{
        this.dialogService.open('error','Main.MainCenter.NotAddedComment');
      }
    });

  }

  deleteComment(commentId:string, postId:string){
    this.commentService.deleteComment(commentId).subscribe(result => {
      if(result.isSuccess){
        let post = this.posts.find(x => x.id === postId);
        let index = post?.comments.findIndex(x => x.commentId === commentId);
        post?.comments.splice(index!, 1);
        this.dialogService.open('info','Main.MainCenter.DeletedComment');
      }else{
        this.dialogService.open('error','Main.MainCenter.NotDeletedComment');
      }  
    });
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

  expandComment(expansionPanel:MatExpansionPanel, button:MatButton){
    if(expansionPanel.expanded){
      button.color = undefined;
      expansionPanel.close();
    }
    else{
      button.color = 'primary'
      expansionPanel.open();
    }
      
  }

  getRouter(userName:string) : string{
    if(this.userService.userName === userName)
      return '/profile'

    return '/profile/' + userName
  }

}
