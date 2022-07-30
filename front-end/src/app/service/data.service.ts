import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  register(data: any){
    return this.http.post(environment.apiUrl+'/api/register', data);
  }

  login(data: any){
    return this.http.post(environment.apiUrl+'/api/login', data)
  }

  userInfo(userId:any){
    return this.http.get(environment.apiUrl+'/api/user/'+userId);
  }

  changeUserName(data: any, userId:any){
    return this.http.put(environment.apiUrl+'/api/user/'+userId+'/change-name', data);
  }

  changeUserEmail(data: any, userId:any){
    return this.http.put(environment.apiUrl+'/api/user/'+userId+'/change-email', data);
  }
}
