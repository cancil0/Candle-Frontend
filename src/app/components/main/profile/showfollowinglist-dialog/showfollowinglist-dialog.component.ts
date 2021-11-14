import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { FollowingList } from 'src/app/models/follow/followingList.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { FollowService } from 'src/app/services/followService/follow.service';

@Component({
  selector: 'app-showfollowinglist-dialog',
  templateUrl: './showfollowinglist-dialog.component.html',
  styleUrls: ['./showfollowinglist-dialog.component.scss']
})
export class ShowFollowingListDialogComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any> | undefined
  @Output() updatedCount: EventEmitter<number> = new EventEmitter();
  following:FollowingList[] = [];
  isLoading:boolean = true;
  isError: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private followService:FollowService,
              private dialogService:DialogService,
              private translateService:TranslateService) { }

  displayedColumns: string[] = ['followerName', 'button-notfollow'];
  dataSource = new MatTableDataSource(this.following);
  resources:any ={
    tableheader: '',
    tablebutton: ''
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    if(this.data.listType === 'following'){
      this.followingList();
      this.resources.tableheader = this.translateService.instant('Main.ShowFollowingListDialog.Following');
      this.resources.tablebutton = this.translateService.instant('Main.ShowFollowingListDialog.StopFollowing');
    }else{
      this.followerList();
      this.resources.tableheader = this.translateService.instant('Main.ShowFollowingListDialog.Follower');
      this.resources.tablebutton = this.translateService.instant('Main.ShowFollowingListDialog.Remove');
    }
  }

  followingList(){
    this.followService.getFollowings(this.data.userName).subscribe((result) => {
      if(result.data.length > 0){
        this.dataSource.data = result.data;
      }
      this.isLoading = false;
    },(error) => {
      setTimeout(() => {
        console.log(error)
        this.isLoading = false;
        this.isError = true
      }, 1000);
    });
  }

  followerList(){
    this.followService.getFollowers(this.data.userName).subscribe((result) => {
      if(result.data.length > 0){
        this.dataSource.data = result.data;
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
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.dialogService.close();
            this.updatedCount.emit(this.dataSource.data.length);
          }else{
            this.dialogService.open('error','Main.ShowFollowingListDialog.Exception.ProblemOccured',);
          }
        }); 
      }else{
        return;
      }
    });
    
  }
}
