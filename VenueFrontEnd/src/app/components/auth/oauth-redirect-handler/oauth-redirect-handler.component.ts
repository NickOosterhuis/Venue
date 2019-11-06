import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-oauth-redirect-handler',
  templateUrl: './oauth-redirect-handler.component.html',
  styleUrls: ['./oauth-redirect-handler.component.css']
})
export class OAuthRedirectHandlerComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  ngOnInit() {
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');

    if (token) {
      this.authService.loginSocial(token)
      this.router.navigate(['/events']);
    } else {
      console.log('some error on fb login');
      this.router.navigate(['/events']);
    }
  }

}
