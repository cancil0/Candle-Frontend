import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/common/result/result.model';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { FollowingList } from 'src/app/models/follow/followingList.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

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

}
