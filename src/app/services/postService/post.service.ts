import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddPostDto } from 'src/app/models/user/addPostDto.model';
import { Post } from 'src/app/models/user/post.model';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/common/result/result.model';
import { GetPostByUserNameDto } from 'src/app/models/user/getPostByUserNameDto.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http : HttpClient) { }

  getById(id:string):Observable<ResultData<Post>>{
    const url : string = `${environment.apiUrl}api/Post/GetPost/${id}`;
    return this.http.get<ResultData<Post>>(url);
  }

  getByUserName(getPostByUserNameDto:GetPostByUserNameDto):Observable<ResultData<Post[]>>{
    const url : string = `${environment.apiUrl}api/Post/GetByUserName`;
    return this.http.post<ResultData<Post[]>>(url,getPostByUserNameDto);
  }

  getMainPost(getPostByUserNameDto:GetPostByUserNameDto):Observable<ResultData<Post[]>>{
    const url : string = `${environment.apiUrl}api/Post/GetMainPost`;
    return this.http.post<ResultData<Post[]>>(url,getPostByUserNameDto);
  }

  getDiscoveryPost(getPostByUserNameDto:GetPostByUserNameDto):Observable<ResultData<Post[]>>{
    const url : string = `${environment.apiUrl}api/Post/GetDiscoveryPost`;
    return this.http.post<ResultData<Post[]>>(url,getPostByUserNameDto);
  }

  addPost(addPostDto:AddPostDto):Observable<Result>{
    const url : string = `${environment.apiUrl}api/Post/AddPost`;
    return this.http.post<Result>(url,addPostDto);
  }

  deletePost(id:string):Observable<Result>{
    const url : string = `${environment.apiUrl}api/Post/DeletePost/${id}`;
    return this.http.delete<Result>(url);
  }
}
