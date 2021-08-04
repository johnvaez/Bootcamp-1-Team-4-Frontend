import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../../global/const';


@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  verifyAccount(data: any): Observable<any> {
    return this.http.get<any>(`${URL_API}/${data.identityType}/${data.identityNumber}`);
  }

}
