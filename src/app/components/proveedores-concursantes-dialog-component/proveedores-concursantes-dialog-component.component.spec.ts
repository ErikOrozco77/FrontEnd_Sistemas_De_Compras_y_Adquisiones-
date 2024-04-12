import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresConcursantesDialogComponentComponent } from './proveedores-concursantes-dialog-component.component';

describe('ProveedoresConcursantesDialogComponentComponent', () => {
  let component: ProveedoresConcursantesDialogComponentComponent;
  let fixture: ComponentFixture<ProveedoresConcursantesDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresConcursantesDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresConcursantesDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
