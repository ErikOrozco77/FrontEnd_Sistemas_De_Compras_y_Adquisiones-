import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionGanadorComponent } from './seleccion-ganador.component';

describe('SeleccionGanadorComponent', () => {
  let component: SeleccionGanadorComponent;
  let fixture: ComponentFixture<SeleccionGanadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionGanadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionGanadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
