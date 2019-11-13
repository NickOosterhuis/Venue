import { Component, OnInit } from '@angular/core';
import {EventResponse} from '../../../models/apiResponses/event-response';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {VenueResponse} from '../../../models/apiResponses/venue-response';
import {VenueService} from '../../../services/venue/venue.service';
import {DateHelper} from '../../../helpers/date-helper';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit {

  venues: Set<VenueResponse>;
  error: ErrorResponse;

  constructor(private venueService: VenueService) { }

  ngOnInit() {
    this.venueService.getVenues().subscribe(
      data => this.venues = data,
      error => this.error = error
    );
  }
}
