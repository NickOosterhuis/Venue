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
    this.combineDateAndTimes();
  }

  combineDateAndTimes(): void {
    // Start DateTime of Event
    this.pickedStartTime = this.createEventFormGroup.get('startTimeCtrl').value;
    const startTimeArr = this.pickedStartTime.split(':');
    const startHour = parseInt(startTimeArr[0], 10);
    const startMin = parseInt(startTimeArr[1], 10);

    this.pickedStartDate.setHours(startHour, startMin, 0);
    console.log(this.pickedStartDate);


    this.convertJSDateToDateTimeOffset(this.pickedStartDate);

    // End DateTime of Event
    this.pickedEndTime = this.createEventFormGroup.get('endTimeCtrl').value;
    const endTimeArr = this.pickedEndTime.split(':');
    const endHour = parseInt(endTimeArr[0], 10);
    const endMin = parseInt(endTimeArr[1], 10);

    this.pickedEndDate.setHours(endHour, endMin, 0);
    console.log(this.pickedEndDate);


    this.convertJSDateToDateTimeOffset(this.pickedEndDate);
  }

  convertJSDateToDateTimeOffset(date: Date) {
    const timeZoneOffsetMin = date.getTimezoneOffset();
    const offsetHrs = Math.abs(timeZoneOffsetMin / 60);
    const offsetMins = Math.abs(timeZoneOffsetMin % 60);

    let timezoneStandard;
    let offsetHrsStr;
    let offsetMinsStr;

    if (offsetHrs < 10) {
      offsetHrsStr = '0' + offsetHrs;
    }

    if (offsetMins < 10) {
      offsetMinsStr = '0' + offsetMins;
    }

    if (timeZoneOffsetMin < 0) {
      timezoneStandard = '+' + offsetHrsStr + ':' + offsetMinsStr;
    } else if (timeZoneOffsetMin > 0) {
      timezoneStandard = '-' + offsetHrsStr + ':' + offsetMinsStr;
    } else if (timeZoneOffsetMin === 0) {
      timezoneStandard = 'Z';
    }

    const currentDate = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const currentHrs = date.getHours();
    const currentMins = date.getMinutes();
    const currentSecs = date.getSeconds();

    let convertedDateTime;

    const currentDateStr = currentDate < 10 ? '0' + currentDate.toString() : currentDate.toString();
    const CurrentMonthStr = currentMonth < 10 ? '0' + currentMonth.toString() : currentMonth.toString();
    const currentHrsStr = currentHrs < 10 ? '0' + currentHrs.toString() : currentHrs.toString();
    const currentMinsStr = currentMins < 10 ? '0' + currentMins.toString() : currentMins.toString();
    const currentSecStr = currentSecs < 10 ? '0' + currentSecs.toString() : currentSecs.toString();

    convertedDateTime = currentYear + '-' + CurrentMonthStr + '-' + currentDateStr + 'T' + currentHrsStr + ':' + currentMinsStr + ':' + currentSecStr + timezoneStandard;

    console.log(convertedDateTime);
    return convertedDateTime;
  }
}
