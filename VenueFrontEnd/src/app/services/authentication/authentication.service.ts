import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): any {
    return this.httpClient.post<any>('http://localhost:8080/auth/login', {email, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('email', email);
          const token = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', token);
          return userData;
        }));
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('email')
    return !(user === null);
  }

  logOut(): void {
    sessionStorage.removeItem('email');
  }
}
