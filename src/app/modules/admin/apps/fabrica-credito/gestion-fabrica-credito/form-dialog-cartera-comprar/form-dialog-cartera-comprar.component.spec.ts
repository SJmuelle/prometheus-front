/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDialogCarteraComprarComponent } from './form-dialog-cartera-comprar.component';

describe('FormDialogCarteraComprarComponent', () => {
  let component: FormDialogCarteraComprarComponent;
  let fixture: ComponentFixture<FormDialogCarteraComprarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDialogCarteraComprarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogCarteraComprarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
