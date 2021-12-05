import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { GetProfileInfoDto } from 'src/app/models/user/getProfileCountDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  getProfileInfos(userName:string):Observable<ResultData<GetProfileInfoDto>>{
    const url : string = `${environment.apiUrl}api/Profile/GetProfileInfos/${userName}`;
    return this.http.get<ResultData<GetProfileInfoDto>>(url);
  }

  changeProfilePhoto(){

  }

}
