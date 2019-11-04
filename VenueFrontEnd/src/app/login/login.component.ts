import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {RegisterComponent} from '../register/register.component';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor( public dialog: MatDialog,
               public dialogLoginRef: MatDialogRef<LoginComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {}

  onRegisterClicked(): void {
    const dialogRegisterRef = this.dialog.open(RegisterComponent, {
      width: '1000px',
      data: {}
    });

    dialogRegisterRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    this.dialogLoginRef.close();
  }

  onLoginClicked(): void {
    console.log('login clicked');
  }

  onFacebookLoginClicked(): void {
    console.log('Facebook login clicked');
  }

  onGoogleLoginClicked(): void {
    console.log('Google login clicked');
  }

  ngOnInit() {
  }
}
