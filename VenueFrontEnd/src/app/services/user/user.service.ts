import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../constants';
import {Profile} from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getProfile(): any {
    return this.httpClient.get(Constants.API_BASE_URL + Constants.API_USER_ME);
  }

  updateProfile(profile: Profile) {
    return this.httpClient.put(Constants.API_BASE_URL + Constants.API_USER_ME, profile);
  }
}
