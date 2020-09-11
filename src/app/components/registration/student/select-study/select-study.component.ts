import { Component, OnInit, Input } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import { RegistrationService } from '../../../registration/registration.service';
import { Form, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-study',
  templateUrl: './select-study.component.html',
  styleUrls: ['./select-study.component.scss']
})
export class SelectStudyComponent implements OnInit {

  // university: NgOption[] | any= [];
  // faculty: NgOption[] | any = [];
  // cathedra: NgOption[] | any = [];
  // specialty: NgOption[] | any = [];
  // group: NgOption[] | any = [];

  // facultyValue: any;
  // cathedraValue: any;
  // specialtyValue: any;
  // groupValue: any;

  constructor(private registration: RegistrationService) { }

  ngOnInit(): void {
    // this.getUniversity();
  }

  // async getUniversity() {
  //   this.university = await this.registration.getAllUniversity().toPromise();
  //   console.log(this.university)
  // }

  // async getFaculty(obj){
  //   this.faculty = await this.registration.getFacultyById(obj.university_id).toPromise();
  //   this.facultyValue = [];
  //   this.cathedraValue = [];
  //   this.specialtyValue = [];
  //   this.groupValue = [];
  // }

  // async getCathedra(obj){
  //   this.cathedra = await this.registration.getCathedraById(obj.faculty_id).toPromise();
  //   this.cathedraValue = [];
  //   this.specialtyValue = [];
    
  // }

  // async getSpecialty(obj){
  //   this.specialty = await this.registration.getSpecialtyById(obj.cathedra_id).toPromise();
  //   this.specialtyValue = [];
  //   this.groupValue = [];
  // }

  // async getGroup(obj){
  //   this.group = await this.registration.getGroupById(obj.specialty_id).toPromise();
  //   this.groupValue = [];
  // }

}
