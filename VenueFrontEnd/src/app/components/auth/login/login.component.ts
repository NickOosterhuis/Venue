import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Constants} from '../../../constants';
import {ErrorResponse} from '../../../models/apiResponses/error-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  error: ErrorResponse;
  errorSocialLogin: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required]
    });

    if (history.state.data) {
      this.errorSocialLogin = history.state.data;
    }
  }

  onLoginClicked(): void {

    const email = this.loginFormGroup.get('emailCtrl').value;
    const password = this.loginFormGroup.get('passwordCtrl').value;

    this.authService.login(email, password).subscribe(
      data => {
        this.authService.getUserRole();
        this.router.navigate(['/events']);
      },
      error => this.error = error
    );
    this.errorSocialLogin = null;
  }

  onFacebookLoginClicked(): void {
    this.document.location.href = Constants.FACEBOOK_AUTH_URL;
  }

  onGoogleLoginClicked(): void {
    this.document.location.href = Constants.GOOGLE_AUTH_URL;
  }
}
