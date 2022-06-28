import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogComentariosComponent } from './form-dialog-comentarios.component';

describe('FormDialogComentariosComponent', () => {
  let component: FormDialogComentariosComponent;
  let fixture: ComponentFixture<FormDialogComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogComentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
