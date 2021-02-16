import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FuzzysetService} from '../../../../services/fuzzyset/fuzzyset.service'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UsersInfoService } from '../../../../services/users/users-info.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'app-student-cabinet',
  templateUrl: './student-cabinet.component.html',
  styleUrls: ['./student-cabinet.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class StudentCabinetComponent implements OnInit {
  lectors: NgOption[] | any = [];

  studentForm: FormGroup = new FormGroup({
    "studentWorkName": new FormControl("", Validators.required),
    "studentWorkLector": new FormControl(null, Validators.required),
  });

  get studentWorkName() {
    return this.studentForm.get('studentWorkName')
  }

  constructor(private fuzzy: FuzzysetService, private modalService: NgbModal, private usersInfo: UsersInfoService) { }

  user = JSON.parse(localStorage.getItem('user'));
  percents: any;

  ngOnInit(): void {}

  async getUsers(role){
    if(role === 'lector'){
      this.lectors = await this.usersInfo.getUsersByRole(role)
      this.lectors.map((i) => { i.fullName = `${i.user_second_name} ${i.user_first_name} ${i.user_middle_name} `; return i; });
    }
  }

  getPercents(name){
    if(this.studentForm.get('studentWorkName').value){
      this.fuzzy.getCourseWorks(name).then(data => this.percents = `${(data[0][0] * 100).toFixed(2)}`);
      // this.fuzzy.getCourseWorks(name).then(data => this.percents = `${(data[0][0] * 100).toFixed(2)} % "${data[0][1]}"`);
    } else {
      this.studentForm.get('studentWorkName').markAsTouched()
    }
   
  }

  open(content) {
    this.modalService.open(content, {size: 'lg' });
  }

  // async submitDiplomaForm() {
  //   if (!this.diplomaForm.invalid) {
  //     console.log('work')
  //   }
  // }

}
