import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/events/event.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {User} from '../../models/responses/user';
import {UserService} from '../../services/users/user.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<any>;
  user: User;

  constructor(private eventService: EventService,
              private authService: AuthenticationService,
              private  userService: UserService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });

    // this.userService.getOwnProfile().subscribe(data => {
    //   console.log(data);
    //   this.user = data;
    // });
  }

}
