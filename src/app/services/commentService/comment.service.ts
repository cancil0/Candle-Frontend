import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCommentRequestDto } from 'src/app/models/comment/addCommentRequestDto.model';
import { AddCommentResponseDto } from 'src/app/models/comment/addCommentResponseDto.model';
import { Result } from 'src/app/models/common/result/result.model';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) { }

  getPostComments(postId:string):Observable<ResultData<Comment[]>>{
    const url : string = `${environment.apiUrl}api/Comment/GetPostComments?id=${postId}`;
    return this.http.get<ResultData<Comment[]>>(url);
  }

  deleteComment(commentId:string):Observable<Result>{
    const url : string = `${environment.apiUrl}api/Comment/DeleteComment/${commentId}`;
    return this.http.delete<Result>(url);
  }

  addComment(addCommentRequestDto:AddCommentRequestDto):Observable<ResultData<AddCommentResponseDto>>{
    const url : string = `${environment.apiUrl}api/Comment/AddComment`;
    return this.http.post<ResultData<AddCommentResponseDto>>(url,addCommentRequestDto);
  }
}
