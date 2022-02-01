import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogComentarioReferenciaComponent } from './form-dialog-comentario-referencia.component';

describe('FormDialogComentarioReferenciaComponent', () => {
  let component: FormDialogComentarioReferenciaComponent;
  let fixture: ComponentFixture<FormDialogComentarioReferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogComentarioReferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogComentarioReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
