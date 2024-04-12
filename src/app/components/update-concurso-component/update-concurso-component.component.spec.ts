import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConcursoComponentComponent } from './update-concurso-component.component';

describe('UpdateConcursoComponentComponent', () => {
  let component: UpdateConcursoComponentComponent;
  let fixture: ComponentFixture<UpdateConcursoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConcursoComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateConcursoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
