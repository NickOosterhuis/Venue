import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {FormControl} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class EmailValidator {

  debouncer: any;

  constructor(public authService: AuthService) { }

  checkEmail(control: FormControl): any {

    console.log(control.value);

    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.authService.checkEmail(control.value).subscribe(
          data => resolve(''),
          error => resolve({'emailTaken': true})
        );
      }, 1000);
    });
  }

}
