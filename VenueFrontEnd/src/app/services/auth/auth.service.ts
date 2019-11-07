import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenResponse} from '../../models/apiResponses/token-response';
import {Constants} from '../../constants';
import {User} from '../../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<TokenResponse>;
  public currentUser: Observable<TokenResponse>;

  // test
  exists: boolean;


  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<TokenResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  loginSocial(token: string): any {
    const tokenResult = new TokenResponse();
    tokenResult.accessToken = token;
    tokenResult.tokenType = 'Bearer ';

    localStorage.setItem('currentUser', JSON.stringify(tokenResult));
    this.currentUserSubject.next(tokenResult);
    return tokenResult;
  }

  login(email: string, password: string): any {
    return this.httpClient.post<any>(Constants.API_BASE_URL + Constants.API_LOGIN, {email, password}).pipe(
      map(
        userToken => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(userToken));
          this.currentUserSubject.next(userToken);
          return userToken;
        }));
  }

  register(user: User): any {
    return this.httpClient.post<any>(Constants.API_BASE_URL + Constants.API_REGISTER, user);
  }

  isUserLoggedIn(): boolean {
    return !(this.currentUserSubject.value === null);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.currentUserSubject.next(null);
  }

  checkUsername(username: string): any {
    return this.httpClient.post<any>(Constants.API_BASE_URL + Constants.API_CHECK_USERNAME, username);
  }

  checkEmail(email: string): any {
    return this.httpClient.post<any>(Constants.API_BASE_URL + Constants.API_CHECK_EMAIL, email);
  }
}
