import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../constants';
import {UpdateUserProfile} from '../../models/UpdateUserProfile';
import {UpdateUserPassword} from '../../models/update-user-password';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getProfile(): any {
    return this.httpClient
      .get(Constants.API_BASE_URL + Constants.API_USER_ME);
  }

  updateProfile(profile: UpdateUserProfile) {
    return this.httpClient.put(Constants.API_BASE_URL + Constants.API_USER_ME, profile);
  }

  updatePassword(passwords: UpdateUserPassword) {
    return this.httpClient.put(Constants.API_BASE_URL + Constants.API_USER_ME + Constants.API_USER_CHANGE_PASSWORD, passwords);
  }
}
