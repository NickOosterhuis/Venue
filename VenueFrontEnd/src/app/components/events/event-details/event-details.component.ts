import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../../../services/event/event.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {EventResponse} from '../../../models/apiResponses/event-response';
import {DateHelper} from '../../../helpers/date-helper';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  id: any;
  private sub: Subscription;

  event: EventResponse;
  error: ErrorResponse;

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private dateHelper: DateHelper) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.eventService.getEvent(this.id).subscribe(
      data => this.event = data,
      error => this.error = error
    );
  }
}
