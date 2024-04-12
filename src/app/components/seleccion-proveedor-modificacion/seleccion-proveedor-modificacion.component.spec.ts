import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionProveedorModificacionComponent } from './seleccion-proveedor-modificacion.component';

describe('SeleccionProveedorModificacionComponent', () => {
  let component: SeleccionProveedorModificacionComponent;
  let fixture: ComponentFixture<SeleccionProveedorModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionProveedorModificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionProveedorModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
