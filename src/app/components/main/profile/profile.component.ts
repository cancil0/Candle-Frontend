import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { LikePostRequest } from 'src/app/models/like/likePostRequest.model';
import { GetPostByUserNameDto } from 'src/app/models/user/getPostByUserNameDto.model';
import { GetProfileInfoDto } from 'src/app/models/user/getProfileCountDto.model';
import { Post } from 'src/app/models/user/post.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { FileService } from 'src/app/services/fileSService/file.service';
import { LikeService } from 'src/app/services/likeService/like.service';
import { PostService } from 'src/app/services/postService/post.service';
import { ProfileService } from 'src/app/services/profileService/profile.service';
import { UserService } from 'src/app/services/userService/user.service';
import { ShowFollowingListDialogComponent } from './showfollowinglist-dialog/showfollowinglist-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class ProfileComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  posts : Post[] = [];
  scrollCount:number = 0;
  isLastRequest:boolean = false;
  isLoading:boolean = true;
  userName:string = this.userService.userName;
  imgURL: any;
  isMyProfile:boolean = true;
  isOpen:boolean = false
  getProfileInfoDto:GetProfileInfoDto={
    post:0,
    following:0,
    follower:0,
    profilePhotoPath:'',
    userNameSurname:''
  }
  getPostByUserNameDto:GetPostByUserNameDto ={
    userName:'',
    scrollCount:0,
    takeCount:5
  }
  likePostRequest:LikePostRequest = {
    postId:'',
    userId:this.userService.userId
  }
  constructor(private dialog: MatDialog,
              private fileService:FileService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private postService : PostService,
              private userService: UserService,
              private profileService: ProfileService,
              private dialogService : DialogService,
              private likeService : LikeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(response => {
      if(response["userName"]){
        this.userName = response["userName"];
        this.isMyProfile = false;
      }
    });

    this.getProfileInfos();
    this.getAllPosts();
  }

  getAllPosts(){
    this.getPostByUserNameDto.userName = this.userName;
    this.getPostByUserNameDto.scrollCount = this.scrollCount;
    this.postService.getByUserName(this.getPostByUserNameDto).subscribe((res) => {
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
      this.isLoading = false
    });
  }

  getProfileInfos(){
    this.profileService.getProfileInfos(this.userName).subscribe((res) => {
      if(res.isSuccess){
        this.getProfileInfoDto = res.data
      }
      this.isLoading = false
    });
  }

  deletePost(id : string){
    this.dialogService.open('question', 'Main.Profile.IsPostDeleted').subscribe((result) => {
      if(result){
        this.postService.deletePost(id).subscribe((res) => {
          if(res.isSuccess){
            this.dialogService.open('info', 'Main.Profile.PostIsDeleted');
            let index = this.posts.findIndex(x=> x.id == id);
            this.posts.splice(index, 1);
            this.getProfileInfoDto.post--;
          }
        });
        
      }else{
        return;
      }
    })
  }

  followingList(){
    let dialogRef = this.dialog.open(ShowFollowingListDialogComponent, {
      width: '20%',
      minHeight: '10%',
      height : 'auto',
      data: {
        'userName':this.userName,
        'listType':'following',
        'isMyProfile': this.isMyProfile
      }
    });
    dialogRef.componentInstance.updatedCount.subscribe(res => {
      this.getProfileInfoDto.following = res;
    });
  }

  followerList(){
    let dialogRef = this.dialog.open(ShowFollowingListDialogComponent, {
      width: '20%',
      minHeight: '10%',
      height : 'auto',
      data: {
        'userName':this.userName,
        'listType':'follower',
        'isMyProfile': this.isMyProfile
      }
    });
    dialogRef.componentInstance.updatedCount.subscribe(res => {
      this.getProfileInfoDto.follower = res;
    });
  }

  loadMore(){
    this.getAllPosts();
  }

  changeProfilePhoto(file:any){
    this.dialogService.open('question','Main.Profile.IsPPChanged').subscribe((result) => {
      if(result){
        this.fileService.uploadProfilePhoto(file.target.files[0], this.userName).subscribe((res) => {
          if(res.isSuccess){
            this.dialogService.open('info','Main.Profile.PPChanged');
            var reader = new FileReader();
            reader.readAsDataURL(file.target.files[0]); 
            reader.onload = (_event) => { 
            this.imgURL = reader.result; 
            }
          }
        });
      }else{
        return;
      }
    });
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

  getRouter(userName:string){
    if(userName === this.userService.userName){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/profile'])
      });
    }else{
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/profile/' + userName])
      });
    }
    
    
  }

}
