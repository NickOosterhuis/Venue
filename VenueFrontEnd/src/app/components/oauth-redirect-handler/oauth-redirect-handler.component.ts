import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {TokenResult} from '../../models/responses/token-result';
import {Router} from '@angular/router';

@Component({
  selector: 'app-oauth-redirect-handler',
  templateUrl: './oauth-redirect-handler.component.html',
  styleUrls: ['./oauth-redirect-handler.component.css']
})
export class OAuthRedirectHandlerComponent implements OnInit {
  currentUser;

  constructor(private authService: AuthenticationService,
              private router: Router) {
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');

    if(token) {
      this.authService.loginFacebook(token)
      router.navigate(['/events']).then();
    } else {
      console.log('some error on fb login');
      router.navigate(['/events']).then();
    }
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
