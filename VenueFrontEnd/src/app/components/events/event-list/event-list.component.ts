import { Component, OnInit } from '@angular/core';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {EventResponse} from '../../../models/apiResponses/event-response';
import {EventService} from '../../../services/event/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Set<EventResponse>;
  error: ErrorResponse;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      data => this.events = data,
      error => this.error = error
    );
  }

}
