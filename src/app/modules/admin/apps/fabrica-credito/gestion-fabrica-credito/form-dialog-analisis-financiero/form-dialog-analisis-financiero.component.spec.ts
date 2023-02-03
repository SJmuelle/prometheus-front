import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogAnalisisFinancieroComponent } from './form-dialog-analisis-financiero.component';

describe('FormDialogAnalisisFinancieroComponent', () => {
  let component: FormDialogAnalisisFinancieroComponent;
  let fixture: ComponentFixture<FormDialogAnalisisFinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogAnalisisFinancieroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogAnalisisFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
