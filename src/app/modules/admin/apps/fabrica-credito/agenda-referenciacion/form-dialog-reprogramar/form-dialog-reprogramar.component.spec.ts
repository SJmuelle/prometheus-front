import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogReprogramarComponent } from './form-dialog-reprogramar.component';

describe('FormDialogReprogramarComponent', () => {
  let component: FormDialogReprogramarComponent;
  let fixture: ComponentFixture<FormDialogReprogramarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogReprogramarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogReprogramarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
