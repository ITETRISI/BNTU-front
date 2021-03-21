import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../app/services/admin/admin.service';
import {NgbDate, NgbCalendar, NgbDateParserFormatter,NgbModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  dates: any;
  listOfUsers;
  selectedAttributes;
  roles = [{ id: 'student', name: 'Студент' }, {id: 'secretary', name:'Секретарь'},{id: 'lector', name:'Преподаватель из университета'}, {id: 'head-of-department', name:'Заведующий кафедры'}];
  yearStart: NgbDateStruct;
  yearEnd: NgbDateStruct;

  constructor(private admin: AdminService,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private modalService: NgbModal) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  
  async ngOnInit() {
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
    await this.getAllDate();
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  async submitDate(){
    await this.admin.postDate(Object.values(this.fromDate).join('-'),Object.values(this.toDate).join('-'));
    await this.getAllDate()
  }

  async getAllDate(){
    this.dates = await this.admin.getDate()
  }

  async deleteDate(id){
    await this.admin.deleteDate(id)
    await this.getAllDate()
  }
}
