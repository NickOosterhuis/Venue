import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {RegisterComponent} from '../register/register.component';
import {FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {User} from '../../models/responses/user';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alerts/alert.service';
import {Constants} from '../../constants';
import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password:string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor( public dialog: MatDialog,
               public dialogLoginRef: MatDialogRef<LoginComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private authService: AuthenticationService,
               private alertService: AlertService,
               @Inject(DOCUMENT) private document: Document) {}

  onRegisterClicked(): void {
    const dialogRegisterRef = this.dialog.open(RegisterComponent, {
      width: '1000px',
      data: {}
    });

    dialogRegisterRef.afterClosed().subscribe();
    this.dialogLoginRef.close();
  }

  onLoginClicked(): void {
    this.authService.login(this.email, this.password).subscribe(
      data => {
        this.dialogLoginRef.close()
      }, error => {
        this.alertService.error(Constants.WRONG_EMAIL_OR_PASSWORD)
      }
    );
  }

  onFacebookLoginClicked(): void {
    console.log('Facebook login clicked');

    console.log(Constants.FACEBOOK_AUTH_URL);
    this.document.location.href = Constants.FACEBOOK_AUTH_URL;
  }

  onGoogleLoginClicked(): void {
    console.log('Google login clicked');
  }

  ngOnInit() {
  }
}
