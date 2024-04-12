import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConcursosComponent } from './menu-concursos.component';

describe('MenuConcursosComponent', () => {
  let component: MenuConcursosComponent;
  let fixture: ComponentFixture<MenuConcursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuConcursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConcursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
