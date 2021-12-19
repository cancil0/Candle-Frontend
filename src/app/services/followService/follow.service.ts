import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/common/result/result.model';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { FollowModel } from 'src/app/models/follow/follow.model';
import { FollowingList } from 'src/app/models/follow/followingList.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  followingList:FollowingList[] = [];
  followerList:FollowingList[] = [];

  constructor(private http : HttpClient) { }

  getFollowers(userName:string):Observable<ResultData<FollowingList[]>>{
    const url : string = `${environment.apiUrl}api/Follower/GetFollowerList/${userName}`;
    return this.http.get<ResultData<FollowingList[]>>(url);
  }

  getFollowings(userName:string):Observable<ResultData<FollowingList[]>>{
    const url : string = `${environment.apiUrl}api/Follower/GetFollowingList/${userName}`;
    return this.http.get<ResultData<FollowingList[]>>(url);
  }

  stopFollowing(id:string):Observable<Result>{
    const url : string = `${environment.apiUrl}api/Follower/StopFollowing/${id}`;
    return this.http.delete<Result>(url);
  }

  follow(followModel:FollowModel):Observable<ResultData<string>>{
    const url : string = `${environment.apiUrl}api/Follower/Follow`;
    return this.http.post<ResultData<string>>(url,followModel);
  }

  getFollowingList(){
    return this.followingList;
  }

  setFollowingList(followingList:FollowingList[]){
    this.followingList = followingList;
  }

  addToFollowingList(following:FollowingList){
    this.followingList.push(following);
  }

  removeFromFollowingList(followerName:string){
    let index = this.followingList.findIndex(x => x.followerName === followerName);
    if(index !== -1)
      this.followingList.splice(index, 1);
  }

  getFollowerList(){
    return this.followerList;
  }

  setFollowerList(followerList:FollowingList[]){
    this.followerList = followerList;
  }

  addToFollowerList(follower:FollowingList){
    this.followerList.push(follower);
  }

  removeFromFollowerList(userName:string){
    let index = this.followerList.findIndex(x => x.followerName === userName);
    if(index !== -1)
      this.followerList.splice(index, 1);
  }
}
