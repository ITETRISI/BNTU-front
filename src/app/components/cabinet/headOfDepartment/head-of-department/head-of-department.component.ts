import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../services/admin/admin.service'

@Component({
  selector: 'app-head-of-department',
  templateUrl: './head-of-department.component.html',
  styleUrls: ['./head-of-department.component.scss']
})
export class HeadOfDepartmentComponent implements OnInit {

  active = 1;
  listOfUsers;
  listOfStudents;
  selectedAttributes;
  roles = [{ id: 'student', name: 'Студент' }, {id: 'secretary', name:'Секретарь'},{id: 'lector', name:'Преподаватель из университета'}, {id: 'head-of-department', name:'Заведующий кафедры'}];
  
  constructor(private admin: AdminService) { }
  
  async ngOnInit() {
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
    this.listOfStudents =  await this.admin.getAllStudents()
    this.listOfStudents.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
    console.log(this.listOfStudents)
  }

  async delete(id) {
    await this.admin.deleteUser(id)
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
  }

  async confirm(id){
    await this.admin.confirmUser(id)
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
  }

  async updateRole(id,role){
    await this.admin.updateUserRole(id,role)
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
  }

}
