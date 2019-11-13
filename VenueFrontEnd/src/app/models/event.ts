export class Event {
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

  constructor(title: string,
              description: string,
              payment: number,
              streetName: string,
              houseNumber: string,
              postalCode: string,
              state: string,
              country: string,
              startDateAndTime: string,
              endDateAndTime: string,
              bandDescription: string,
              genre: string) {
    this.title = title;
    this.description = description;
    this.payment = payment;
    this.streetName = streetName;
    this.houseNumber = houseNumber;
    this.postalCode = postalCode;
    this.streetName = streetName;
    this.state = state;
    this.country = country;
    this.startDateAndTime = startDateAndTime;
    this.endDateAndTime = endDateAndTime;
    this.bandDescription = bandDescription;
    this.genre = genre;
  }
}
