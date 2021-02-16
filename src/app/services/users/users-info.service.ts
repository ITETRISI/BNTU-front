import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersInfoService {

  constructor(private http: HttpClient) { }

  getUsersByRole(role){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`http://localhost:5000/users/${role}`, {headers:token}).toPromise();
  }
  
}
