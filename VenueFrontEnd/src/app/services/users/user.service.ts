import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constants} from '../../constants';
import {User} from '../../models/responses/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getOwnProfile(): any {
    return this.http.get(Constants.API_BASE_URL + Constants.API_USER_ME);
  }
}
