import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {VenueService} from '../services/venue/venue.service';

@Injectable({providedIn: 'root'})
export class CompanyNameValidator {

  debouncer: any;

  constructor(public venueService: VenueService) { }

  checkCompanyName(control: FormControl): any {

    console.log(control.value);

    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.venueService.checkIfVenueNameIsTaken(control.value).subscribe(
          data => resolve(''),
          error => resolve({'companyNameTaken': true})
        );
      }, 1000);
    });
  }

}
