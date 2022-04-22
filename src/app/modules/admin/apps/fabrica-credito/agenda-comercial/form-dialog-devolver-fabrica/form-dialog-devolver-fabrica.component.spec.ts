import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogDevolverFabricaComponent } from './form-dialog-devolver-fabrica.component';

describe('FormDialogDevolverFabricaComponent', () => {
  let component: FormDialogDevolverFabricaComponent;
  let fixture: ComponentFixture<FormDialogDevolverFabricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogDevolverFabricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogDevolverFabricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
