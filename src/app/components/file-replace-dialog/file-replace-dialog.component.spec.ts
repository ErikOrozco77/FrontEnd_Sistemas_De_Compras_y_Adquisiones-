import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReplaceDialogComponent } from './file-replace-dialog.component';

describe('FileReplaceDialogComponent', () => {
  let component: FileReplaceDialogComponent;
  let fixture: ComponentFixture<FileReplaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileReplaceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileReplaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
