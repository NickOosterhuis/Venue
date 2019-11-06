import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar-items',
  templateUrl: './navbar-items.component.html',
  styleUrls: ['./navbar-items.component.css']
})
export class NavbarItemsComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogoutClicked() {
    this.authService.logout();
  }
}
