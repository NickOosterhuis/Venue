import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../services/event/event.service';
import {AuthService} from '../../../services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {DateAdapter} from '@angular/material';
import {timestamp} from 'rxjs/operators';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  createEventFormGroup: FormGroup;
  error: ErrorResponse;
  currentDate: Date;
  pickedEndDate: Date;
  pickedStartDate: Date;
  pickedStartTime: string;
  pickedEndTime: string;

  constructor(private eventService: EventService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private adapter: DateAdapter<any>
              ) {
    this.adapter.setLocale('nl-NL');
  }

  ngOnInit() {

    this.currentDate = new Date();

    this.createEventFormGroup = this.formBuilder.group({
      titleCtrl: ['', Validators.required],
      descriptionCtrl: ['', Validators.required],
      streetNameCtrl: ['', Validators.required],
      houseNumberCtrl: ['', Validators.required],
      stateCtrl: ['', Validators.required],
      postalCodeCtrl: ['', Validators.required],
      startDateCtrl: ['', Validators.required],
      startTimeCtrl: ['', Validators.required],
      endTimeCtrl: ['', Validators.required],
      endDateCtrl: ['', Validators.required],
      countryCtrl: ['', Validators.required],
    });
  }

  setMaxDateOnStartDatePicker(): Date {
    this.pickedEndDate = this.createEventFormGroup.get('endDateCtrl').value;
    return this.pickedEndDate;
  }

  setMinDateOnEndDatePicker(): Date {
    this.pickedStartDate = this.createEventFormGroup.get('startDateCtrl').value;
    return this.pickedStartDate;
  }

  onCreateEventClicked(): void {
    this.combineDateAndTime();
  }

  combineDateAndTime(): void {
    this.pickedStartTime = this.createEventFormGroup.get('startTimeCtrl').value;
    const startTimeArr = this.pickedStartTime.split(':');
    const startHour = parseInt(startTimeArr[0], 10);
    const startMin = parseInt(startTimeArr[1], 10);

    this.pickedStartDate.setHours(startHour, startMin, 0);
    console.log(this.pickedStartDate);

    this.pickedEndTime = this.createEventFormGroup.get('endTimeCtrl').value;
    const endTimeArr = this.pickedStartTime.split(':');
    const endHour = parseInt(endTimeArr[0], 10);
    const endMin = parseInt(endTimeArr[1], 10);

    this.pickedStartDate.setHours(endHour, endMin, 0);
    console.log(this.pickedEndDate);
  }
}
