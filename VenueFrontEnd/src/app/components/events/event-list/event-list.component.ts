import {Component, OnInit} from '@angular/core';
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

  calculateTimeAgo(date: string): string {

    const dateToObj: any = new Date(date);
    const now: any = new Date();

    const seconds = Math.floor((now - dateToObj) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' years ago';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months ago';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days ago';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  }

  formatDatetoLocalDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('nl-NL');
  }

  formatDatetoLocalTime(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('nl-NL', {hour12: false});
  }

}
