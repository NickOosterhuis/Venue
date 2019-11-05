import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {TokenResult} from '../../models/responses/token-result';

@Component({
  selector: 'app-oauth-redirect-handler',
  templateUrl: './oauth-redirect-handler.component.html',
  styleUrls: ['./oauth-redirect-handler.component.css']
})
export class OAuthRedirectHandlerComponent implements OnInit {
  currentUser

  constructor(private authService: AuthenticationService) {
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');

    console.log(token);
    console.log(error);

    this.authService.loginFacebook(token);
    this.currentUser = this.authService.currentUserValue;

    console.log(this.currentUser)
  }

  ngOnInit() {
  }

  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };



}
