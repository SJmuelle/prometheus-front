import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogReferenciacionComponent } from './form-dialog-referenciacion.component';

describe('FormDialogReferenciacionComponent', () => {
  let component: FormDialogReferenciacionComponent;
  let fixture: ComponentFixture<FormDialogReferenciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogReferenciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogReferenciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
