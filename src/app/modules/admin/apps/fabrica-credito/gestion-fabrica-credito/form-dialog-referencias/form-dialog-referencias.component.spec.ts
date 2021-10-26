import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogReferenciasComponent } from './form-dialog-referencias.component';

describe('FormDialogReferenciasComponent', () => {
  let component: FormDialogReferenciasComponent;
  let fixture: ComponentFixture<FormDialogReferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogReferenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogReferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
