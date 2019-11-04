import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {Constants} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): any {
    return this.httpClient.post<any>(Constants.API_BASE_URL + Constants.API_LOGIN, {email, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('email', email);
          const token = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', token);
          return userData;
        }));
  }

  register(user: User): any {
    return this.httpClient.post<any>(Constants.API_BASE_URL + Constants.API_REGISTER, user);
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('email')
    return !(user === null);
  }

  logout(): void {
    sessionStorage.removeItem('email');
  }
}
