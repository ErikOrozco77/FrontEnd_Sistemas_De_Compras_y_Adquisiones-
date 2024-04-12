import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionProveedorDialogComponent } from './seleccion-proveedor-dialog.component';

describe('SeleccionProveedorDialogComponent', () => {
  let component: SeleccionProveedorDialogComponent;
  let fixture: ComponentFixture<SeleccionProveedorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionProveedorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionProveedorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
