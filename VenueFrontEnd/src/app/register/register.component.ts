import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication/authentication.service';

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

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthenticationService) {}

  onRegisterClicked(): void {
    console.log('Register clicked');
    this.authService.register(this.user).subscribe();
    this.authService.login(this.user.email, this.user.password).subscribe(this.dialogRef.close());
  }

  ngOnInit() {
  }

}
