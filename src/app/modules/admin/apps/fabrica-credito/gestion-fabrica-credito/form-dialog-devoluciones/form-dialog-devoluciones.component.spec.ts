import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogDevolucionesComponent } from './form-dialog-devoluciones.component';

describe('FormDialogDevolucionesComponent', () => {
  let component: FormDialogDevolucionesComponent;
  let fixture: ComponentFixture<FormDialogDevolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogDevolucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogDevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
