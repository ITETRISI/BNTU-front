import { Component, OnInit } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import { RegistrationService } from '../registration.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  university: NgOption[] | any= [];
  faculty: NgOption[] | any = [];
  cathedra: NgOption[] | any = [];
  specialty: NgOption[] | any = [];
  group: NgOption[] | any = [];

  studentForm : FormGroup = new FormGroup({    
    "userLogin": new FormControl("", Validators.required),
    "userPassword": new FormControl("", Validators.required),
    "userSecondName": new FormControl("",[ Validators.required, Validators.pattern("^[А-Яа-яЁё]+")]),
    "userFirstName": new FormControl("", [ Validators.required, Validators.pattern("^[А-Яа-яЁё]+")]),
    "userMiddleName": new FormControl("", [ Validators.required, Validators.pattern("^[А-Яа-яЁё]+")]),
    "userUniversity": new FormControl(null, Validators.required),
    "userFaculty": new FormControl(null, Validators.required),
    "userCathedra": new FormControl(null, Validators.required),
    "userSpecialty": new FormControl(null, Validators.required),
    "userGroup": new FormControl(null, Validators.required),
});


  constructor(private registration: RegistrationService) { }

  ngOnInit(){
    this.getUniversity();
  }

  get userLogin(){
    return this.studentForm.get('userLogin')
  }
  get userPassword(){
    return this.studentForm.get('userPassword')
  }
  get userSecondName(){
    return this.studentForm.get('userSecondName')
  }
  get userFirstName(){
    return this.studentForm.get('userFirstName')
  }
  get userMiddleName(){
    return this.studentForm.get('userMiddleName')
  }

  submit(){
    if(!this.studentForm.invalid){
      console.log(this.studentForm.value)
    }
  }

  showInvalidFields(){
    const controls = this.studentForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          controls[name].markAsTouched() ;
        }
    }
  }

  async getUniversity() {
    this.university = await this.registration.getAllUniversity().toPromise();
    
  }

  async getFaculty(obj){
    this.faculty = await this.registration.getFacultyById(obj.university_id).toPromise();
    this.studentForm.controls['userFaculty'].setValue([])
    this.studentForm.controls['userCathedra'].setValue([])
    this.studentForm.controls['userSpecialty'].setValue([])
    this.studentForm.controls['userGroup'].setValue([])
  }

  async getCathedra(obj){
    this.cathedra = await this.registration.getCathedraById(obj.faculty_id).toPromise();
    this.studentForm.controls['userCathedra'].setValue([])
    this.studentForm.controls['userSpecialty'].setValue([])
    this.studentForm.controls['userGroup'].setValue([])
    
  }

  async getSpecialty(obj){
    this.specialty = await this.registration.getSpecialtyById(obj.cathedra_id).toPromise();
    this.studentForm.controls['userSpecialty'].setValue([])
    this.studentForm.controls['userGroup'].setValue([])
  }

  async getGroup(obj){
    this.group = await this.registration.getGroupById(obj.specialty_id).toPromise();
    this.studentForm.controls['userGroup'].setValue([])
  }

}


