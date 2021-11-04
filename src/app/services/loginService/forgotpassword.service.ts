import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/common/result/result.model';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { ChangePasswordDto } from 'src/app/models/login/changePasswordDto.model';
import { EnterPinForgotPassRequestDto } from 'src/app/models/login/enterPinForgotPassRequestDto.model';
import { ForgotPasswordRequestDto } from 'src/app/models/login/forgotPasswordRequestDto.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  token:string = this.localStorageService.token;
  
  options = {
    headers : new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Authorization', `Bearer ${this.token}`)
  }

  constructor(private http : HttpClient,
              private localStorageService:LocalStorageService) { }

  generatePinForgotPassword(forgotPasswordRequestDto:ForgotPasswordRequestDto):Observable<ResultData<string>>{
    const url : string = `${environment.apiUrl}api/Login/GeneratePinForgotPassword`;
    return this.http.post<ResultData<string>>(url,forgotPasswordRequestDto,this.options);
  }

  enterPinForgotPassword(enterPinForgotPassRequestDto:EnterPinForgotPassRequestDto):Observable<Result>{
    const url : string = `${environment.apiUrl}api/Login/EnterPinForgotPassword`;
    return this.http.post<Result>(url,enterPinForgotPassRequestDto,this.options);
  }

  changePassword(changePasswordDto:ChangePasswordDto):Observable<Result>{
    const url : string = `${environment.apiUrl}api/Login/ChangePassword`;
    return this.http.put<Result>(url,changePasswordDto,this.options);
  }
}
