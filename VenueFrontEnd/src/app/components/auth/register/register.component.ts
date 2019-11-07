import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/user';
import {Venue} from '../../../models/venue';
import {Router} from '@angular/router';
import {VenueService} from '../../../services/venue/venue.service';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {UsernameValidator} from '../../../customvalidators/username-validator';
import {EmailValidator} from '../../../customvalidators/email-validator';
import {CompanyNameValidator} from '../../../customvalidators/company-name-validator';

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

  // API Errors
  errorRegisterObj: ErrorResponse;
  errorVenueObj: ErrorResponse;

  constructor(private formBuilder: FormBuilder,
              private usernameValidator: UsernameValidator,
              private emailValidator: EmailValidator,
              private companyNameValidator: CompanyNameValidator,
              private authService: AuthService,
              private venueService: VenueService,
              private router: Router) { }

  ngOnInit() {
    this.registrationFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required, this.usernameValidator.checkUsername.bind(this.usernameValidator)],
      emailCtrl: ['', [Validators.required, Validators.email],  this.emailValidator.checkEmail.bind(this.emailValidator)],
      passwordCtrl: ['', Validators.required],
      venueCtrl: [false, Validators.required]
    });

    this.venueFormGroup = this.formBuilder.group( {
      companyNameCtrl: ['', Validators.required, this.companyNameValidator.checkCompanyName.bind(this.companyNameValidator)],
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

    this.authService.register(user).subscribe(
      data => console.log(data),
      error => this.errorRegisterObj = error,
      next => {
        if (this.errorRegisterObj == null) {
          this.authService.login(user.email, user.password).subscribe(
            () => this.registerVenue()
          );
        }
      },
    );
  }

  registerVenue(): void {

    console.log('this is a venue ' + this.isVenue)

    if (this.isVenue) {
      const companyName = this.venueFormGroup.get('companyNameCtrl').value;
      const streetName = this.venueFormGroup.get('streetNameCtrl').value;
      const houseNumber = this.venueFormGroup.get('houseNumberCtrl').value;
      const postalCode = this.venueFormGroup.get('postalCodeCtrl').value;
      const state = this.venueFormGroup.get('stateCtrl').value;
      const country = this.venueFormGroup.get('countryCtrl').value;
      const phoneNumber = this.venueFormGroup.get('phoneNumberCtrl').value;

      const venue = new Venue(companyName, streetName, houseNumber, postalCode, state, country, phoneNumber);

      this.venueService.postVenue(venue).subscribe(
        data => console.log(data),
        error => this.errorVenueObj = error,
      );
    }
  }

  onRegisterClicked(): void {
    this.register();
    if (this.errorVenueObj == null && this.errorRegisterObj == null) {
      this.router.navigate(['/events']);
    }
  }

}
