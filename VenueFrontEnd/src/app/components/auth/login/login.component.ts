import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Constants} from '../../../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private authService: AuthService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  onLoginClicked(): void {
    this.authService.login(this.email, this.password).subscribe(
      data => this.router.navigate(['/events'])
    );
  }

  onFacebookLoginClicked(): void {
    this.document.location.href = Constants.FACEBOOK_AUTH_URL;
  }

  onGoogleLoginClicked(): void {
    this.document.location.href = Constants.GOOGLE_AUTH_URL;
  }

}
