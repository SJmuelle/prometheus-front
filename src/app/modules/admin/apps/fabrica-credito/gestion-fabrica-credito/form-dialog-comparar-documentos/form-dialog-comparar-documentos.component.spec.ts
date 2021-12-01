import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogCompararDocumentosComponent } from './form-dialog-comparar-documentos.component';

describe('FormDialogCompararDocumentosComponent', () => {
  let component: FormDialogCompararDocumentosComponent;
  let fixture: ComponentFixture<FormDialogCompararDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogCompararDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogCompararDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
