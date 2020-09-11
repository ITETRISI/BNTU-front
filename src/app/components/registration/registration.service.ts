import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  postData(text){
    const body = {description: text}
    return this.http.post('http://localhost:5000/test', body);
  }

  getAllUniversity(){
    return this.http.get('http://localhost:5000/university');
  }

  getFacultyById(id){
    return this.http.get(`http://localhost:5000/faculty/${id}`);
  }

  getCathedraById(id){
    return this.http.get(`http://localhost:5000/cathedra/${id}`);
  }

  getSpecialtyById(id){
    return this.http.get(`http://localhost:5000/specialty/${id}`);
  }

  getGroupById(obj){
    const body = {id: obj, key: 'groups', f_key: 'fk_specialty'}
    return this.http.post(`http://localhost:5000/groups/`, body);
  }

  deleteData(id){
    const body = {description: id};
    return this.http.delete(`http://localhost:5000/test/${id}`);
  }
}
