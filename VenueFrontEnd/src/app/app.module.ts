import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './components/alert/alert.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreateVenueComponent } from './components/venue/venue-create/create-venue.component';
import { VenueListComponent } from './components/venue/venue-list/venue-list.component';
import { VenueDetailsComponent } from './components/venue/venue-details/venue-details.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { OAuthRedirectHandlerComponent } from './components/auth/oauth-redirect-handler/oauth-redirect-handler.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule, MatSlideToggleModule,
  MatStepperModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    EventListComponent,
    LoginComponent,
    RegisterComponent,
    CreateVenueComponent,
    VenueListComponent,
    VenueDetailsComponent,
    EventDetailsComponent,
    OAuthRedirectHandlerComponent,
    NavbarComponent,
    CreateEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
