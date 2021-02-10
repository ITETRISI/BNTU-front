import {
  Injectable
} from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: object;
  constructor(private http: HttpClient, private router: Router) {}

  async loginUser(body){
    try{
    const data = await this.http.post('http://localhost:5000/log-in', body).toPromise();
    localStorage.setItem('token',data['token'])
    this.router.navigateByUrl(`/${data['role']}`);
    } catch(error){
      console.log(error)
      return error.status;
    }
  }

  async registerUser(body) {
    const data = await this.http.post('http://localhost:5000/register', body).toPromise();
    localStorage.setItem('token',data['token'])
  }

  async checkRole(){
    if(localStorage.getItem('token')){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const user = await this.http.get('http://localhost:5000/user-data', {headers:token}).toPromise();
    localStorage.setItem('user', JSON.stringify(user));
    return {role:user['role'], confirm: user['user_confirm']};
    } else {
      return null
    }
  }
}