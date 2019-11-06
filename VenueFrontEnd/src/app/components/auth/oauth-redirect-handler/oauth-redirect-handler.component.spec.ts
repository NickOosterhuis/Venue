import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuthRedirectHandlerComponent } from './oauth-redirect-handler.component';

describe('OAuthRedirectHandlerComponent', () => {
  let component: OAuthRedirectHandlerComponent;
  let fixture: ComponentFixture<OAuthRedirectHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OAuthRedirectHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OAuthRedirectHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
