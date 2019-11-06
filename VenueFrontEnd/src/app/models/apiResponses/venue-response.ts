import {UserResponse} from './user-response';

export class VenueResponse {
  id: string;
  companyName: string;
  streetName: string;
  houseNumber: string;
  postalCode: string;
  state: string;
  country: string;
  phoneNumber: string;

  user: UserResponse;
}
