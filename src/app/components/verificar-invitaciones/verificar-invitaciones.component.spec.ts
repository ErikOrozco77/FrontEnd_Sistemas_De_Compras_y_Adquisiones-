import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarInvitacionesComponent } from './verificar-invitaciones.component';

describe('VerificarInvitacionesComponent', () => {
  let component: VerificarInvitacionesComponent;
  let fixture: ComponentFixture<VerificarInvitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarInvitacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarInvitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
