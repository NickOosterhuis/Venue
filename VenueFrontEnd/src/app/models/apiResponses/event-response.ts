import {Venue} from '../venue';

export class EventResponse {
  id: string;
  title: string;
  description: string;
  payment: number;
  streetName: string;
  houseNumber: string;
  postalCode: string;
  state: string;
  country: string;
  startDateAndTime: string;
  endDateAndTime: string;
  postedAt: string;

  venue: Venue;

}
