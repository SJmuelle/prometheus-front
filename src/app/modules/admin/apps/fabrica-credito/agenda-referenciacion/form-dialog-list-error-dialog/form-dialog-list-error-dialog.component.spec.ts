import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogListErrorDialogComponent } from './form-dialog-list-error-dialog.component';

describe('FormDialogListErrorDialogComponent', () => {
  let component: FormDialogListErrorDialogComponent;
  let fixture: ComponentFixture<FormDialogListErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogListErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogListErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
