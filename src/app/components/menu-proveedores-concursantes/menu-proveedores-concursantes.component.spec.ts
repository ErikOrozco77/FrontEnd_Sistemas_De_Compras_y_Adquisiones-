import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProveedoresConcursantesComponent } from './menu-proveedores-concursantes.component';

describe('MenuProveedoresConcursantesComponent', () => {
  let component: MenuProveedoresConcursantesComponent;
  let fixture: ComponentFixture<MenuProveedoresConcursantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuProveedoresConcursantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuProveedoresConcursantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
