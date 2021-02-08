import { Component, OnInit } from '@angular/core';
import {FuzzysetService} from '../../../../services/fuzzyset/fuzzyset.service'
@Component({
  selector: 'app-student-cabinet',
  templateUrl: './student-cabinet.component.html',
  styleUrls: ['./student-cabinet.component.scss']
})
export class StudentCabinetComponent implements OnInit {

  constructor(private fuzzy: FuzzysetService) { }
  user = JSON.parse(localStorage.getItem('user'));
  percents: any;
  ngOnInit(): void {
    
  }

  getPercents(name){
    console.log(name)
    this.fuzzy.getCourseWorks(name).then(data => this.percents = `${(data[0][0] * 100).toFixed(2)} % "${data[0][1]}"`);
  }

}
