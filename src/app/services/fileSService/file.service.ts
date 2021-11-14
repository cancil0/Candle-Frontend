import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/common/result/result.model';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { UploadFileDto } from 'src/app/models/file/uploadFileDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
  constructor(private http: HttpClient) {}

  onFileSelected(file:File[], userName:string): Observable<ResultData<UploadFileDto[]>>{
    const url : string = `${environment.apiUrl}api/File/UploadFile?userName=${userName}`;
    const formData = new FormData();

    for (let index = 0; index < file.length; index++) {
      if (file[index]) {
        formData.append("files", file[index]);
      }
    }

    return this.http.post<ResultData<UploadFileDto[]>>(url, formData);
  }

  uploadProfilePhoto(file:File, userName:string): Observable<Result>{
    const url : string = `${environment.apiUrl}api/File/UploadProfilePhoto?userName=${userName}`;
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<Result>(url, formData);
  }
}