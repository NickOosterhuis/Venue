export class UpdateUserPassword {
  newPassword: string;
  newPasswordVerification: string;

  constructor(newPassword, newPasswordVerification) {
    this.newPassword = newPassword;
    this.newPasswordVerification = newPasswordVerification;
  }

}
