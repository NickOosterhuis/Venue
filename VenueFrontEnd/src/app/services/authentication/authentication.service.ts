import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {Constants} from '../../constants';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenResult} from '../../models/responses/token-result';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<TokenResult>;
  public currentUser: Observable<TokenResult>;


  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<TokenResult>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): any {
    return this.httpClient.post<any>(Constants.API_BASE_URL + Constants.API_LOGIN, {email, password}).pipe(
      map(
        userToken => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(userToken));
          this.currentUserSubject.next(userToken);
          console.log(userToken);
          return userToken;
        }));
  }

  register(user: User): any {
    return this.httpClient.post<any>(Constants.API_BASE_URL + Constants.API_REGISTER, user);
  }

  isUserLoggedIn(): boolean {
    console.log(this.currentUser)

    return !(this.currentUser === null);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.currentUserSubject.next(null);
  }
}
