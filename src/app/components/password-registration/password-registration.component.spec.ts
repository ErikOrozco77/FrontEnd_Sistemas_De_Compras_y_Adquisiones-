import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRegistrationComponent } from './password-registration.component';

describe('PasswordRegistrationComponent', () => {
  let component: PasswordRegistrationComponent;
  let fixture: ComponentFixture<PasswordRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
