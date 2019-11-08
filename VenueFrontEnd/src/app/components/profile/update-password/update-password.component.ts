import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UpdateUserPassword} from '../../../models/update-user-password';
import {UserService} from '../../../services/user/user.service';
import {UserResponse} from '../../../models/apiResponses/user-response';
import {ErrorResponse} from '../../../models/apiResponses/error-response';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  @Input() showMePartially: boolean;
  updatePasswordFormGroup: FormGroup;

  error: ErrorResponse;
  success: string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setupUpdatePasswordFormGroup();
  }

  updatePassword(): void {
    const newPassword = this.updatePasswordFormGroup.get('passwordCtrl').value;
    const verificationPassword = this.updatePasswordFormGroup.get('verifyPasswordCtrl').value;

    console.log(newPassword);
    console.log(verificationPassword);

    const updatedPassword = new UpdateUserPassword(newPassword, verificationPassword);
    this.userService.updatePassword(updatedPassword).subscribe(
      data => this.success = 'Successfully changed password',
      error => this.error = error
    );
  }

  setupUpdatePasswordFormGroup(): void {
    this.updatePasswordFormGroup = this.formBuilder.group({
      passwordCtrl: ['', Validators.required],
      verifyPasswordCtrl: ['', Validators.required]
    });
  }

}
