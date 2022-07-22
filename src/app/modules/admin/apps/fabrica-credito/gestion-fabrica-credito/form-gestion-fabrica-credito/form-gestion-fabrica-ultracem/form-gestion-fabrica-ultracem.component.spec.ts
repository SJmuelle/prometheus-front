/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormGestionFabricaUltracemComponent } from './form-gestion-fabrica-ultracem.component';

describe('FormGestionFabricaUltracemComponent', () => {
  let component: FormGestionFabricaUltracemComponent;
  let fixture: ComponentFixture<FormGestionFabricaUltracemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestionFabricaUltracemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestionFabricaUltracemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
