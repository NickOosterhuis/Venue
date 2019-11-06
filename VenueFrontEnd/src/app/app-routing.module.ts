import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventListComponent} from './components/events/event-list/event-list.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {OAuthRedirectHandlerComponent} from './components/auth/oauth-redirect-handler/oauth-redirect-handler.component';
import {VenueListComponent} from './components/venue/venue-list/venue-list.component';
import {CreateVenueComponent} from './components/venue/venue-create/create-venue.component';
import {VenueDetailsComponent} from './components/venue/venue-details/venue-details.component';
import {EventDetailsComponent} from './components/events/event-details/event-details.component';
import {CreateEventComponent} from './components/events/create-event/create-event.component';
import {ProfileComponent} from './components/profile/profile/profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'oauth2/redirect', component: OAuthRedirectHandlerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'venues', component: VenueListComponent },
  { path: 'venues/create', component: CreateVenueComponent },
  { path: 'venues/details/{id}', component: VenueDetailsComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventListComponent },
  { path: 'events/details/{id}', component: EventDetailsComponent},
  { path: 'events/create', component: CreateEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
