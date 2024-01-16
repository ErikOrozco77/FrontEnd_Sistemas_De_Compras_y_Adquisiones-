import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorRegistrationComponent } from './proveedor-registration.component';

describe('ProveedorRegistrationComponent', () => {
  let component: ProveedorRegistrationComponent;
  let fixture: ComponentFixture<ProveedorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
