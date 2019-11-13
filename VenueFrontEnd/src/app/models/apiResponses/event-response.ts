import {Venue} from '../venue';
import {VenueResponse} from './venue-response';

export class EventResponse {
  id: string;
  title: string;
  description: string;
  bandDescription: string;
  genre: string;
  payment: number;
  streetName: string;
  houseNumber: string;
  postalCode: string;
  state: string;
  country: string;
  startDateAndTime: string;
  endDateAndTime: string;
  postedAt: string;

  venue: VenueResponse;

}
