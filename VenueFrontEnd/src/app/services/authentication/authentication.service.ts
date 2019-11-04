import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {Constants} from '../../constants';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('email')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

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
