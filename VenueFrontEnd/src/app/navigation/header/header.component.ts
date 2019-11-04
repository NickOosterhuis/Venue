import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginComponent} from '../../login/login.component';
import {MatDialog} from '@angular/material';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = this.authService.isUserLoggedIn();

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public dialog: MatDialog,
              private authService: AuthenticationService) { }

  ngOnInit() {
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '1000px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.isLoggedIn = this.authService.isUserLoggedIn();
    });
  }

  logout(): void {
    this.authService.logOut();
    this.isLoggedIn = this.authService.isUserLoggedIn();
    console.log('User Logged out');
  }
}
