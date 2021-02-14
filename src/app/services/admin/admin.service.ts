import {
  Injectable
} from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) {}

  async getAllUsers() {
    console.log('allUsers')
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/users', {
      headers: token
    }).toPromise();
    return data
  }

  async deleteUser(id) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/user/${id}`, {
      headers: token
    }).toPromise();
  }

 async confirmUser(id) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put(`http://localhost:5000/user/${id}`,null, {
      headers: token
    }).toPromise();
  }

  async updateUserRole(id, newUserRole) {
    const body = {
      id,
      newUserRole
    }
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put(`http://localhost:5000/user/role`,body, {
      headers: token
    }).toPromise();
  }

}