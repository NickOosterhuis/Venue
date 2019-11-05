import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {EventListComponent} from './components/event-list/event-list.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {OAuthRedirectHandlerComponent} from './components/oauth-redirect-handler/oauth-redirect-handler.component';


const routes: Routes = [
  { path: 'events', component: EventListComponent},
  { path: '', redirectTo: '/events', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'oauth2/redirect', component: OAuthRedirectHandlerComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
