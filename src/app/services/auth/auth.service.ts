import {
  Injectable
} from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: object;
  constructor(private http: HttpClient) {}

  registerUser(body) {
    console.log('service', body)
    this.http.post('http://localhost:5000/user', body).subscribe((resp: any) => {
      localStorage.setItem('token',resp.token)
    })
  }
}