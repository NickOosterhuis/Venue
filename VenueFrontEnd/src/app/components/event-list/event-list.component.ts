import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/events/event.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<any>;
  currentUser: User;

  constructor(private eventService: EventService, private authService: AuthenticationService) {
    this.currentUser = this.authService.currentUserValue;
  }

  getOwnProfile() {

  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

}
