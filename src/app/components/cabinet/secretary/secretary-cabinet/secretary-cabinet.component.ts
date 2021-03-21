import { Component, OnInit } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-secretary-cabinet',
  templateUrl: './secretary-cabinet.component.html',
  styleUrls: ['./secretary-cabinet.component.scss']
})
export class SecretaryCabinetComponent implements OnInit {
  active = 1;

  years: NgOption[] | any = [];

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  secretaryForm:FormGroup = new FormGroup({
    "secYear": new FormControl("", Validators.required),
  })

  constructor(private modalService: NgbModal, calendar: NgbCalendar) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
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


  
}
