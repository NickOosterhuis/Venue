import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class UsernameValidator {

  debouncer: any;

  constructor(public authService: AuthService) { }

  checkUsername(control: FormControl): any {

    console.log(control.value);

    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.authService.checkUsername(control.value).subscribe(
          data => resolve(''),
          error => resolve({'usernameTaken': true})
        );
      }, 1000);
    });
  }
}
