import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Venue} from '../../models/venue';
import {Constants} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private httpClient: HttpClient) { }

  postVenue(venue: Venue): any {
    return this.httpClient.post<any>(Constants.API_BASE_URL + Constants.API_VENUE, venue);
  }

  getVenues(): any {
    return this.httpClient.get(Constants.API_BASE_URL + Constants.API_VENUE);
  }

  getVenue(id: string): any {
    return this.httpClient.get(Constants.API_BASE_URL + Constants.API_VENUE + '/' + id);
  }

  putVenue(updatedVenue: Venue): any {
    return this.httpClient.put(Constants.API_BASE_URL + Constants.API_VENUE, updatedVenue);
  }
}
