import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FollowModel } from 'src/app/models/follow/follow.model';
import { FollowingList } from 'src/app/models/follow/followingList.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { FollowService } from 'src/app/services/followService/follow.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-showfollowinglist-dialog',
  templateUrl: './showfollowinglist-dialog.component.html',
  styleUrls: ['./showfollowinglist-dialog.component.scss']
})
export class ShowFollowingListDialogComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any> | undefined
  @Output() updatedCount: EventEmitter<number> = new EventEmitter();
  displayedColumns: string[] = ['followerName', 'button-notfollow'];
  following:FollowingList[] = [];
  dataSource = new MatTableDataSource(this.following);
  isLoading:boolean = true;
  isError: boolean = false;
  tableheaderText:string = ''
  tablebuttonText: string = ''
  followButtonText: string =''
  followText:string = ''
  followingText:string = ''
  notFollowingText:string = ''
  followingYouText:string = ''
  notFollowingYouText:string = ''
  followModel:FollowModel  ={
    userId:'',
    followerId:''
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private followService:FollowService,
              private dialogService:DialogService,
              private translateService:TranslateService,
              private dialogRef: MatDialogRef<ShowFollowingListDialogComponent>,
              private router:Router,
              public userService: UserService) { }

  ngOnInit(): void {
    this.setResources();
    
  }

  followingList(){
    this.followService.getFollowings(this.data.userName).subscribe((result) => {
      if(result.data.length > 0){
        this.dataSource.data = result.data;
        if(this.data.userName !== this.userService.userName){
          this.followService.getFollowings(this.userService.userName).subscribe((res) => {
            if(res.isSuccess){
              this.followService.followingList = res.data;
            }
          });
        }else{
          this.followService.followingList = result.data;
        }
        
      }
      this.isLoading = false;
    },() => {
      setTimeout(() => {
        this.isLoading = false;
        this.isError = true
      }, 1000);
    });
  }

  followerList(){
    this.followService.getFollowers(this.data.userName).subscribe((result) => {
      if(result.data.length > 0){
        this.dataSource.data = result.data;
        if(this.userService.userName !== this.data.userName){
        this.followService.getFollowers(this.userService.userName).subscribe((res) => {
          this.followService.followerList = res.data;
        });
        }else{
          this.followService.followerList = result.data;
        }
      }
      this.isLoading = false;
    },() => {
      setTimeout(() => {
        this.isLoading = false;
        this.isError = true
      }, 1000);
    });

  }

  removeData(id:string, followerName:string){
    let question = '';
    if(this.data.listType === 'following')
      question = this.translateService.instant('Main.ShowFollowingListDialog.StopFollowingUser');
    else
      question = this.translateService.instant('Main.ShowFollowingListDialog.RemoveFollowerUser');

    this.dialogService.open('question', question.replace('{0}', followerName)).subscribe((result) => {
      if(result){
        this.followService.stopFollowing(id).subscribe((res) => {
          if(res){
            let index = this.dataSource.data.findIndex(x => x.id == id);
            if(index !== -1)
              this.dataSource.data.splice(index, 1);
            if(this.data.listType === 'following')
              this.followService.removeFromFollowingList(followerName);
            else if (this.data.listType === 'follower')
              this.followService.removeFromFollowerList(followerName);

            this.dataSource._updateChangeSubscription();
            this.dialogService.close();
            this.updatedCount.emit(this.dataSource.data.length);
          }else{
            this.dialogService.open('error','Main.ShowFollowingListDialog.Exception.ProblemOccured');
          }
        }); 
      }else{
        return;
      }
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRouter(followerName:string) {
    this.dialogRef.close();
    if(followerName === this.userService.userName){
      this.router.navigateByUrl('/', {skipLocationChange: false}).then(() => {
        this.router.navigate(['/profile'])
      });
    }else{
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/profile/' + followerName])
      });
    }
    
  }

  follow(followerId:string, followerName:string, button:MatButton){
    this.followModel = {
      followerId:followerId,
      userId:this.userService.userId
    }
    this.followService.follow(this.followModel).subscribe((res) => {
      if(res.isSuccess){
        button.disabled = true;
        button._elementRef.nativeElement.textContent = this.followingText;
        this.followService.addToFollowingList({
          id:'',
          followerId:this.followModel.followerId,
          followerName:followerName
        })
      }else{
        this.dialogService.open('error','Main.ShowFollowingListDialog.Exception.ProblemOccured');
        button.disabled = false;
        button._elementRef.nativeElement.textContent = this.followText;
      }
    });

  }

  setResources(){
    this.followText = this.translateService.instant('Main.ShowFollowingListDialog.Follow');
    this.followingText = this.translateService.instant('Main.ShowFollowingListDialog.Following');
    this.notFollowingText = this.translateService.instant('Main.ShowFollowingListDialog.NotFollowing');
    this.followingYouText = this.translateService.instant('Main.ShowFollowingListDialog.FollowingYou');
    this.notFollowingYouText = this.translateService.instant('Main.ShowFollowingListDialog.NotFollowingYou');
    if(this.data.listType === 'following'){
      this.followingList();
      this.tableheaderText = this.translateService.instant('Main.ShowFollowingListDialog.Followings');
      this.tablebuttonText = this.translateService.instant('Main.ShowFollowingListDialog.StopFollowing');
    }else{
      this.followerList();
      this.tableheaderText = this.translateService.instant('Main.ShowFollowingListDialog.Follower');
      this.tablebuttonText = this.translateService.instant('Main.ShowFollowingListDialog.Remove');
    }
  }

  isFollow(followerName:string): boolean{
    let index = -1;
    if(this.followService.followingList.length > 0)
      index = this.followService.followingList.findIndex(x => x.followerName === followerName)

    if(index === -1){
      return false;
    }
    return true;
  }

  isFollowOwner(userName:string): boolean{
    let index = -1;
    if(this.followService.followerList.length > 0)
      index = this.followService.followerList.findIndex(x => x.followerName === userName)

    if(index === -1){
      return  false;
    }
    return  true;
  }

}
