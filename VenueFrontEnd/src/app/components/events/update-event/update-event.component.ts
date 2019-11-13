import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../../models/event';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {EventService} from '../../../services/event/event.service';
import {DateHelper} from '../../../helpers/date-helper';
import {EventResponse} from '../../../models/apiResponses/event-response';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DateAdapter, PageEvent} from '@angular/material';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  id: any;
  private sub: Subscription;

  updateEventFormGroup: FormGroup;
  currentDate: Date;
  pickedEndDate: Date;
  pickedStartDate: Date;
  pickedStartTime: string;
  pickedEndTime: string;
  startDateAndTime: string;
  endDateAndTime: string;
  event: EventResponse;
  eventUpdateError: ErrorResponse;
  eventError: ErrorResponse;

  constructor(private eventService: EventService,
              private dateHelper: DateHelper,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private adapter: DateAdapter<any>) {
    this.adapter.setLocale('nl-NL');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.eventService.getEvent(this.id).subscribe(
      data => {
        this.event = data;
        this.setupUpdateEventFormGroup();
      },
      error => this.eventError = error
    );
  }

  setupUpdateEventFormGroup(): void {
    const presetStartTime = this.dateHelper.formatDbDatetoLocalTime(this.event.startDateAndTime);
    const presetEndTime = this.dateHelper.formatDbDatetoLocalTime(this.event.endDateAndTime);

    this.updateEventFormGroup = this.formBuilder.group( {
      titleCtrl: [this.event.title, Validators.required],
      descriptionCtrl: [this.event.description, Validators.required],
      streetNameCtrl: [this.event.streetName, Validators.required],
      houseNumberCtrl: [this.event.houseNumber, Validators.required],
      stateCtrl: [this.event.state, Validators.required],
      postalCodeCtrl: [this.event.postalCode, Validators.required],
      startDateCtrl: [this.event.startDateAndTime, Validators.required],
      startTimeCtrl: [presetStartTime, Validators.required],
      endTimeCtrl: [presetEndTime, Validators.required],
      endDateCtrl: [this.event.endDateAndTime, Validators.required],
      countryCtrl: [this.event.country, Validators.required],
      paymentCtrl: [this.event.payment, Validators.required],
      bandDescriptionCtrl: [this.event.bandDescription, Validators.required],
      genreCtrl: [this.event.genre, Validators.required]
    });
  }

  onUpdateEventClicked(id: string): void {
    this.combineDateAndTimes();

    const title: string = this.updateEventFormGroup.get('titleCtrl').value;
    const description: string = this.updateEventFormGroup.get('descriptionCtrl').value;
    const payment: number = this.updateEventFormGroup.get('paymentCtrl').value;
    const streetName: string = this.updateEventFormGroup.get('streetNameCtrl').value;
    const houseNumber: string = this.updateEventFormGroup.get('houseNumberCtrl').value;
    const postalCode: string = this.updateEventFormGroup.get('postalCodeCtrl').value;
    const state: string = this.updateEventFormGroup.get('stateCtrl').value;
    const country: string = this.updateEventFormGroup.get('countryCtrl').value;
    const startDateAndTime: string = this.startDateAndTime;
    const endDateAndTime: string = this.endDateAndTime;
    const bandDescription: string = this.updateEventFormGroup.get('bandDescriptionCtrl').value;
    const genre: string = this.updateEventFormGroup.get('genreCtrl').value;


    const event = new Event(
      title,
      description,
      payment,
      streetName,
      houseNumber,
      postalCode,
      state,
      country,
      startDateAndTime,
      endDateAndTime,
      bandDescription,
      genre
    );

    this.eventService.putEvent(id, event).subscribe(
      data => this.router.navigate(['/profile']),
      error => this.eventUpdateError = error
    );


  }

  setMaxDateOnStartDatePicker(): Date {
    this.pickedEndDate = this.updateEventFormGroup.get('endDateCtrl').value;
    return this.pickedEndDate;
  }

  setMinDateOnEndDatePicker(): Date {
    this.pickedStartDate = this.updateEventFormGroup.get('startDateCtrl').value;
    return this.pickedStartDate;
  }

  combineDateAndTimes(): void {
    // Start DateTime of Event
    this.pickedStartTime = this.updateEventFormGroup.get('startTimeCtrl').value;
    const startTimeArr = this.pickedStartTime.split(':');
    const startHour = parseInt(startTimeArr[0], 10);
    const startMin = parseInt(startTimeArr[1], 10);

    console.log('Before set hours: ' + this.pickedStartDate);
    this.pickedStartDate.setHours(startHour, startMin, 0);
    console.log(this.pickedStartDate);

    this.startDateAndTime = this.dateHelper.convertJSDateToDateTimeOffset(this.pickedStartDate);

    // End DateTime of Event
    this.pickedEndTime = this.updateEventFormGroup.get('endTimeCtrl').value;
    const endTimeArr = this.pickedEndTime.split(':');
    const endHour = parseInt(endTimeArr[0], 10);
    const endMin = parseInt(endTimeArr[1], 10);

    this.pickedEndDate.setHours(endHour, endMin, 0);
    console.log(this.pickedEndDate);


    this.endDateAndTime = this.dateHelper.convertJSDateToDateTimeOffset(this.pickedEndDate);
  }
}
