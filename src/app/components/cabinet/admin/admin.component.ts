import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../app/services/admin/admin.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  
  listOfUsers;
  selectedAttributes;
  roles = [{ id: 'student', name: 'Студент' }, {id: 'secretary', name:'Секретарь'}];
  
  constructor(private admin: AdminService) { }
  
  async ngOnInit() {
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
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
