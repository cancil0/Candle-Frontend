import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { GetPostByUserNameDto } from 'src/app/models/user/getPostByUserNameDto.model';
import { GetProfileCountDto } from 'src/app/models/user/getProfileCountDto.model';
import { Post } from 'src/app/models/user/post.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { PostService } from 'src/app/services/postService/post.service';
import { ProfileService } from 'src/app/services/profileService/profile.service';
import { UserService } from 'src/app/services/userService/user.service';

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
  getProfileCountDto:GetProfileCountDto={
    post:0,
    following:0,
    follower:0
  }
  getPostByUserNameDto:GetPostByUserNameDto ={
    userName:'',
    scrollCount:0,
    takeCount:5
  }
  constructor(private postService : PostService,
              private dialogService : DialogService,
              private userService: UserService,
              private profileService: ProfileService) { }

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
        this.getProfileCountDto = res.data
      }
      this.isLoading = false
    },(error:any) => {
      this.dialogService.open('error','Error' + error);
    });
  }

  loadMore(){
    this.getAllPosts();
  }

}
