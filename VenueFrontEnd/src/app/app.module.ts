import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, NG_ASYNC_VALIDATORS, NG_VALIDATORS} from '@angular/forms';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NavbarItemsComponent } from './components/navigation/navbar-items/navbar-items.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import {ErrorInterceptorService} from './services/auth/interceptors/error-interceptor.service';
import {JwtInterceptorService} from './services/auth/interceptors/jwt-interceptor.service';
import {AuthGuardService} from './services/auth/interceptors/auth-guard.service';
import {CanActivate} from '@angular/router';
import {UsernameValidator} from './customvalidators/username-validator';
import {EmailValidator} from './customvalidators/email-validator';
import {CompanyNameValidator} from './customvalidators/company-name-validator';

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
    NavbarItemsComponent,
    ProfileComponent,
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useClass: UsernameValidator,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useClass: EmailValidator,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useClass: CompanyNameValidator,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
