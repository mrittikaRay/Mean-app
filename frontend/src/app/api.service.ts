import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient : HttpClient) { }

  baseURL = 'http://localhost:3000';

  post(url: string , body: any): Observable<any>{
    return this.httpclient.post(`${this.baseURL}${url}`,body,{
      withCredentials : true,
    });
  }

  get(url : string):Observable <any>{
    return this.httpclient.get(`${this.baseURL}${url}`,{
      withCredentials : true,
    });
  }
}
