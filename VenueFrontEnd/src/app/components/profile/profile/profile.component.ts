import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {ErrorResponse} from '../../../models/apiResponses/error-response';
import {UserResponse} from '../../../models/apiResponses/user-response';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsernameValidator} from '../../../customvalidators/username-validator';
import {EmailValidator} from '../../../customvalidators/email-validator';
import {UpdateUserProfile} from '../../../models/updateUserProfile';
import {VenueResponse} from '../../../models/apiResponses/venue-response';
import {VenueService} from '../../../services/venue/venue.service';
import {EventService} from '../../../services/event/event.service';
import {EventResponse} from '../../../models/apiResponses/event-response';
import {DateHelper} from '../../../helpers/date-helper';
import {Event} from '../../../models/event';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserResponse;
  profileCallError: ErrorResponse;
  updateProfileCallError: ErrorResponse;
  showUpdatePassword = false;

  // modal stuff
  closeResult: string;
  updateProfileFormGroup: FormGroup;
  userRole: string;

  venue: VenueResponse;
  venueError: ErrorResponse;

  events: Set<EventResponse>;
  eventError: ErrorResponse;

  constructor(private userService: UserService,
              private authService: AuthService,
              private venueService: VenueService,
              private eventService: EventService,
              private dateHelper: DateHelper,
              private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private usernameValidator: UsernameValidator,
              private emailValidator: EmailValidator) { }

  ngOnInit() {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.getProfile();
      this.getUserRole();

      if (this.userRole === 'ROLE_VENUE') {
        this.getVenue();
      }
    }
  }

  getProfile(): void {
    this.userService.getProfile().subscribe(
      data => this.user = data,
      error => this.profileCallError = error,
    );
  }

  updateProfile(): void {
    const name = this.updateProfileFormGroup.get('nameCtrl').value;
    const email = this.updateProfileFormGroup.get('emailCtrl').value;

    console.log(name);
    console.log(email);

    const updatedProfile = new UpdateUserProfile(name, email);
    this.userService.updateProfile(updatedProfile).subscribe(
      data => {
        this.modalService.dismissAll();
        location.reload();
      },
     error => this.updateProfileCallError = error
    );
  }

  toggleUpdateView() {
    this.showUpdatePassword = !this.showUpdatePassword;
  }

  openEditProfile(content) {
    this.setupUpdateFormGroup();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  throwDeleteAlert(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditVenue(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setupUpdateFormGroup(): void {
    this.updateProfileFormGroup = this.formBuilder.group({
      nameCtrl: [this.user.name, Validators.required, this.usernameValidator.checkUsername.bind(this.usernameValidator)],
      emailCtrl: [this.user.email, [Validators.required, Validators.email], this.emailValidator.checkEmail.bind(this.emailValidator)],
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getUserRole(): void {
    this.userRole = this.authService.getUserRole();
  }

  getVenue(): void {
    this.venueService.getVenueByUser().subscribe(
      data => this.venue = data,
      error => this.venueError = error,
      next => {
        this.eventService.getEventsByVenueId(this.venue.id).subscribe(
        data => this.events = data,
        error => this.venueError = error);
      }
    );
  }

  onDeleteEventClicked(id: string): void {
    if (id) {
      this.eventService.deleteEvent(id).subscribe();
      this.modalService.dismissAll('event deleted');
      location.reload();
    }
  }
}
