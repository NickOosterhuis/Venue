import {Component, OnInit} from '@angular/core';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {EventResponse} from '../../../models/apiResponses/event-response';
import {EventService} from '../../../services/event/event.service';
import {AuthService} from '../../../services/auth/auth.service';
import {DateHelper} from '../../../helpers/date-helper';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Set<EventResponse>;
  error: ErrorResponse;
  userRole: string;

  constructor(private eventService: EventService,
              private authService: AuthService,
              private dateHelper: DateHelper) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      data => this.events = data,
      error => this.error = error
    );

    if (this.error) {
      this.events = new Set<EventResponse>();
    }

    if (this.authService.isUserLoggedIn()) {
      this.userRole = this.authService.getUserRole();
    }
  }



}
