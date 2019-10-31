import { Component, OnInit } from '@angular/core';
import {EventService} from '../services/events/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<any>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

}
