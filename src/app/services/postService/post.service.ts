import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddPostDto } from 'src/app/models/user/addPostDto.model';
import { Post } from 'src/app/models/user/post.model';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/common/result/result.model';
import { GetPostByUserNameDto } from 'src/app/models/user/getPostByUserNameDto.model';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  token:string = this.localStorageService.token

  options = {
    headers : new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Authorization', `Bearer ${this.token}`)
  }
  constructor(private http : HttpClient,
              private localStorageService:LocalStorageService) { }

  getById(id:string):Observable<ResultData<Post>>{
    const url : string = `${environment.apiUrl}api/Post/GetPost/${id}`;
    return this.http.get<ResultData<Post>>(url,this.options);
  }

  getByUserName(getPostByUserNameDto:GetPostByUserNameDto):Observable<ResultData<Post[]>>{
    const url : string = `${environment.apiUrl}api/Post/GetByUserName`;
    return this.http.post<ResultData<Post[]>>(url,getPostByUserNameDto,this.options);
  }

  getMainPost(userName:string):Observable<ResultData<Post[]>>{
    const url : string = `${environment.apiUrl}api/Post/GetMainPost/${userName}`;
    return this.http.get<ResultData<Post[]>>(url,this.options);
  }

  getDiscoveryPost(userName:string):Observable<ResultData<Post[]>>{
    const url : string = `${environment.apiUrl}api/Post/GetDiscoveryPost/${userName}`;
    return this.http.get<ResultData<Post[]>>(url,this.options);
  }

  addPost(addPostDto:AddPostDto):Observable<Result>{
    const url : string = `${environment.apiUrl}api/Post/AddPost`;
    return this.http.post<Result>(url,addPostDto,this.options);
  }
}
