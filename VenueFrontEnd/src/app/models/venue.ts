export class Venue {
  companyName: string;
  streetName: string;
  houseNumber: string;
  postalCode: string;
  state: string;
  country: string;
  phoneNumber: string;

  constructor(companyName, streetName, houseNumber, postalCode, state, country, phoneNumber) {
    this.companyName = companyName;
    this.streetName = streetName;
    this.houseNumber = houseNumber;
    this.postalCode = postalCode;
    this.state = state;
    this.country = country;
    this.phoneNumber = phoneNumber;
  }
}
