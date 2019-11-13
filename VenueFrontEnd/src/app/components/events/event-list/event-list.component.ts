import {Component, OnInit} from '@angular/core';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {EventResponse} from '../../../models/apiResponses/event-response';
import {EventService} from '../../../services/event/event.service';
import {AuthService} from '../../../services/auth/auth.service';
import {DateHelper} from '../../../helpers/date-helper';
import {MatTableDataSource, PageEvent} from '@angular/material';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: ReadonlyArray<EventResponse>;
  error: ErrorResponse;
  userRole: string;

  pageEvent: PageEvent;

  pageIndex = 0;
  pageSize = 5;
  lowValue = 0;
  highValue = 5;

  constructor(private eventService: EventService,
              private authService: AuthService,
              private dateHelper: DateHelper) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      data => {
        this.events = data;
      },
      error => this.error = error
    );

    if (this.authService.isUserLoggedIn()) {
      this.userRole = this.authService.getUserRole();
    }
  }

  getPaginatorData(event): any {
    console.log(event);
    if(event.pageIndex === this.pageIndex + 1){
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue =  this.highValue + this.pageSize;
    } else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  isDateInPast(event: EventResponse): any {

    const currentDate = new Date();
    return event.endDateAndTime < this.dateHelper.convertJSDateToDateTimeOffset(currentDate);
  }
}
