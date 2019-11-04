import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/events/event.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<any>;

  constructor(private eventService: EventService, private authService: AuthenticationService) { }

  ngOnInit() {

    console.log('is user logged in? : ' + this.authService.isUserLoggedIn());

    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

}
