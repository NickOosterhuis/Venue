import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {AlertService} from '../../services/alerts/alert.service';
import {Constants} from '../../constants';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<RegisterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthenticationService,
              private alertService: AlertService) {}

  onRegisterClicked(): void {
    console.log('Register clicked');
    this.authService.register(this.user).subscribe(
      next =>  this.authService.login(this.user.email, this.user.password).subscribe(
        next => this.dialogRef.close(),
        error => this.alertService.error(Constants.WRONG_EMAIL_OR_PASSWORD)
      ),
      error => this.alertService.error(Constants.USER_ALREADY_EXISTS)
    );
  }

  onLoginClicked(): void {
    const dialogRegisterRef = this.dialog.open(LoginComponent, {
      width: '1000px',
      data: {}
    });

    dialogRegisterRef.afterClosed().subscribe();
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
