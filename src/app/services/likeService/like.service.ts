import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/common/result/result.model';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { LikePostRequest } from 'src/app/models/like/likePostRequest.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http : HttpClient) { }

  likePost(likePostRequest:LikePostRequest):Observable<Result>{
    const url : string = `${environment.apiUrl}api/Like/LikePost`;
    return this.http.post<Result>(url, likePostRequest);
  }

  stopLikePost(likePostRequest:LikePostRequest):Observable<Result>{
    const url : string = `${environment.apiUrl}api/Like/StopLikePost`;
    return this.http.post<Result>(url, likePostRequest);
  }
}
