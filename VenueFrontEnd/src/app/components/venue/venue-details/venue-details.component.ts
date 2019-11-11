import { Component, OnInit } from '@angular/core';
import {VenueService} from '../../../services/venue/venue.service';
import {EventService} from '../../../services/event/event.service';
import {VenueResponse} from '../../../models/apiResponses/venue-response';
import {Subscription} from 'rxjs';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {ActivatedRoute} from '@angular/router';
import {EventResponse} from '../../../models/apiResponses/event-response';
import {DateHelper} from '../../../helpers/date-helper';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.css']
})
export class VenueDetailsComponent implements OnInit {

  id: any;
  private sub: Subscription;

  venue: VenueResponse;
  events: Set<EventResponse>;
  error: ErrorResponse;
  eventError: ErrorResponse;

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private eventService: EventService,
              private dateHelper: DateHelper) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.venueService.getVenue(this.id).subscribe(
      data => this.venue = data,
      error => this.error = error,
      next => {
        this.eventService.getEventsByVenueId(this.venue.id).subscribe(
          data => this.events = data,
          error => this.eventError = error
        );
      }
    );
  }

}
