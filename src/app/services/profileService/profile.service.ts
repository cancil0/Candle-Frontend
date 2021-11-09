import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { GetProfileCountDto } from 'src/app/models/user/getProfileCountDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  getProfileCounts(userName:string):Observable<ResultData<GetProfileCountDto>>{
    const url : string = `${environment.apiUrl}api/Profile/GetProfileCounts/${userName}`;
    return this.http.get<ResultData<GetProfileCountDto>>(url);
  }
}
