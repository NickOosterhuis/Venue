import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-items',
  templateUrl: './navbar-items.component.html',
  styleUrls: ['./navbar-items.component.css']
})
export class NavbarItemsComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogoutClicked() {
    this.authService.logout();
    location.reload();
    this.router.navigate(['/events']);
  }
}
