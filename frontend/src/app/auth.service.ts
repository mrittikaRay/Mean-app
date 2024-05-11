import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiservice : ApiService) { }

  signIn (credentials:{userEmail: string, password: string}):Observable<any>{
   return this.apiservice.post('/user/login',credentials)
  }

 

  isAuthenticated(){
    return this.apiservice.get('/is-authenticated');
  }
}
