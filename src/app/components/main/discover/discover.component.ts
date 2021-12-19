import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatExpansionPanel } from '@angular/material/expansion';
import { TranslateService } from '@ngx-translate/core';
import { LikePostRequest } from 'src/app/models/like/likePostRequest.model';
import { GetPostByUserNameDto } from 'src/app/models/user/getPostByUserNameDto.model';
import { Post } from 'src/app/models/user/post.model';
import { Comment } from 'src/app/models/user/comment.model';
import { CommentService } from 'src/app/services/commentService/comment.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { FollowService } from 'src/app/services/followService/follow.service';
import { LikeService } from 'src/app/services/likeService/like.service';
import { PostService } from 'src/app/services/postService/post.service';
import { UserService } from 'src/app/services/userService/user.service';
import { AddCommentRequestDto } from 'src/app/models/comment/addCommentRequestDto.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class DiscoverComponent implements OnInit {

  isLike:boolean = false;
  posts : Post[] = [];
  isAddComent:boolean = false;
  scrollCount:number = 0;
  isLastRequest:boolean = false;
  getPostByUserNameDto:GetPostByUserNameDto ={
    loggedInUserName:'',
    userName:'',
    scrollCount:0,
    takeCount:5
  }
  likePostRequest:LikePostRequest = {
    postId:'',
    userId:this.userService.userId
  }
  followModel = {
    followerId:'',
    userId:this.userService.userId
  }
  constructor(private postService : PostService,
              private dialogService : DialogService,
              private translateService : TranslateService,
              private userService: UserService,
              private likeService : LikeService,
              private followService:FollowService,
              private commentService : CommentService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
    this.getPostByUserNameDto.userName = this.userService.userName;
    this.getPostByUserNameDto.scrollCount = this.scrollCount;
    this.postService.getDiscoveryPost(this.getPostByUserNameDto).subscribe((res) => {
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

  follow(postOwnerId: string,userName: string, button:MatButton){
    var followerTableId = this.followService.followingList.find(x => x.followerName === userName)?.id;
    if(followerTableId === undefined){
      this.followModel.followerId = postOwnerId;

      this.followService.follow(this.followModel).subscribe((res) => {
        if(res.isSuccess){
          button._elementRef.nativeElement.textContent = this.translateService.instant('Main.Profile.Following');
          this.followService.addToFollowingList({
            id:res.data,
            followerId:postOwnerId,
            followerName:userName
          })
        }else{
          this.dialogService.open('error','Main.ShowFollowingListDialog.Exception.ProblemOccured');
          button._elementRef.nativeElement.textContent = this.translateService.instant('Main.Profile.Follow');
        }
      });
    }else{
      let question = '';
      question = this.translateService.instant('Main.ShowFollowingListDialog.StopFollowingUser');
      this.dialogService.open('question', question.replace('{0}', userName)).subscribe((result) => {
        if(result){
          
          this.followService.stopFollowing(followerTableId!).subscribe((res) => {
            if(res.isSuccess){
              this.followService.removeFromFollowingList(userName);
              this.dialogService.close();
              button._elementRef.nativeElement.textContent = this.translateService.instant('Main.Profile.Follow');
            }else{
              button._elementRef.nativeElement.textContent = this.translateService.instant('Main.Profile.Following');
              this.dialogService.open('error','Main.ShowFollowingListDialog.Exception.ProblemOccured');
            }
          });  
        }else{
          return;
        }
      });
    }
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

}
