import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { SignupRequestDto } from 'src/app/models/login/signupRequestDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http : HttpClient) { }

  signUp(signupRequestDto:SignupRequestDto):Observable<ResultData<SignupRequestDto>>{
    const url : string = `${environment.apiUrl}api/Login/SignUp`;
    let options = {
      headers : new HttpHeaders()
                .set('Content-Type', 'application/json')
    }
    return this.http.post<ResultData<SignupRequestDto>>(url,signupRequestDto,options);
  }
}
