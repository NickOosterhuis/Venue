import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): any {
    return this.httpClient.post<any>(this.baseUrl + 'auth/login', {email, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('email', email);
          const token = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', token);
          return userData;
        }));
  }

  register(user: User): any {
    return this.httpClient.post<any>(this.baseUrl + 'auth/signup', user);
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('email')
    return !(user === null);
  }

  logOut(): void {
    sessionStorage.removeItem('email');
  }
}
