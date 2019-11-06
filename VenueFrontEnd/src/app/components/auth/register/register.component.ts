import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/user';
import {Venue} from '../../../models/venue';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLinear = true;
  isVenue = false;
  registrationFormGroup: FormGroup;
  venueFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.registrationFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required],
      venueCtrl: [false, Validators.required]
    });

    this.venueFormGroup = this.formBuilder.group( {
      companyNameCtrl: ['', Validators.required],
      streetNameCtrl: ['', Validators.required],
      houseNumberCtrl: ['', Validators.required],
      postalCodeCtrl: ['', Validators.required],
      stateCtrl: ['', Validators.required],
      countryCtrl: ['', Validators.required],
      phoneNumberCtrl: [''],
    });
  }

  onChange(): void {
    this.isVenue = this.registrationFormGroup.get('venueCtrl').value;
    console.log(this.isVenue);
  }

  register(): void {
    const name = this.registrationFormGroup.get('nameCtrl').value;
    const email = this.registrationFormGroup.get('emailCtrl').value;
    const password = this.registrationFormGroup.get('passwordCtrl').value;

    const user = new User(name, email, password);

    console.log(user);

    //this.authService.register(user).subscribe();
  }

  registerVenue(): void {
    const companyName = this.venueFormGroup.get('companyNameCtrl').value;
    const streetName = this.venueFormGroup.get('streetNameCtrl').value;
    const houseNumber = this.venueFormGroup.get('houseNumberCtrl').value;
    const postalCode = this.venueFormGroup.get('postalCodeCtrl').value;
    const state = this.venueFormGroup.get('stateCtrl').value;
    const country = this.venueFormGroup.get('countryCtrl').value;
    const phoneNumber = this.venueFormGroup.get('phoneNumberCtrl').value;

    const venue = new Venue(companyName, streetName, houseNumber, postalCode, state, country, phoneNumber);

    console.log(venue);
}


  onRegisterClicked(): void {
    if (this.isVenue) {
      this.register();
      this.registerVenue();
    } else {
      this.register();
    }
  }

}
