import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../constants';
import {Event} from '../../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  getEvents(): any {
    return this.httpClient.get(Constants.API_BASE_URL + Constants.API_EVENT);
  }

  getEvent(id: string): any {
    return this.httpClient.get(Constants.API_BASE_URL + Constants.API_EVENT + '/' + id);
  }

  postEvent(event: Event): any {
    return this.httpClient.post(Constants.API_BASE_URL + Constants.API_EVENT, event);
  }

  putEvent(id: string, updatedEvent: Event): any {
    return this.httpClient.put(Constants.API_BASE_URL + Constants.API_EVENT + '/' + id, updatedEvent);
  }

  deleteEvent(id: string): any {
    return this.httpClient.delete(Constants.API_BASE_URL + Constants.API_EVENT + '/' + id);
  }

  getEventsByVenueId(id: string): any {
    return this.httpClient.get(Constants.API_BASE_URL + Constants.API_EVENT + Constants.API_BY_VENUE + '/' + id);
  }
}
