import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { GetPostByUserNameDto } from 'src/app/models/user/getPostByUserNameDto.model';
import { GetProfileInfoDto } from 'src/app/models/user/getProfileCountDto.model';
import { Post } from 'src/app/models/user/post.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { FileService } from 'src/app/services/fileSService/file.service';
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

  isLike:boolean = false;
  posts : Post[] = [];
  isAddComent:boolean = false;
  scrollCount:number = 0;
  isLastRequest:boolean = false;
  isLoading:boolean = true;
  userNameSurname:string = this.userService.userNameSurname;
  userName:string = this.userService.userName;
  imgURL: any;
  getProfileInfoDto:GetProfileInfoDto={
    post:0,
    following:0,
    follower:0,
    profilePhotoPath:''
  }
  getPostByUserNameDto:GetPostByUserNameDto ={
    userName:'',
    scrollCount:0,
    takeCount:5
  }
  constructor(private postService : PostService,
              private dialogService : DialogService,
              private userService: UserService,
              private profileService: ProfileService,
              private dialog: MatDialog,
              private fileService:FileService) { }

  ngOnInit(): void {
    this.getCounts();
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
    }, (error:any)=>{
      this.dialogService.open('error','Error' + error);
    });
  }

  getCounts(){
    this.profileService.getProfileCounts(this.userName).subscribe((res) => {
      if(res.isSuccess){
        this.getProfileInfoDto = res.data
      }
      this.isLoading = false
    },(error:any) => {
      this.dialogService.open('error','Error' + error);
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
        'listType':'following'
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
        'listType':'follower'
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
    this.dialogService.open('question').subscribe((result) => {
      if(result){
        this.fileService.uploadProfilePhoto(file.target.files[0], this.userName).subscribe((res) => {
          if(res.isSuccess){
            this.dialogService.open('info','Profil fotoğrafınız başarılı bir şekilde değiştirildi');
            var reader = new FileReader();
            reader.readAsDataURL(file.target.files[0]); 
            reader.onload = (_event) => { 
            this.imgURL = reader.result; 
            }
          }
        },()=>{
          this.dialogService.open('error');
        });
      }else{
        return;
      }
    });
  }

}
