/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormGestionFabricaLibranzaComponent } from './form-gestion-fabrica-libranza.component';

describe('FormGestionFabricaLibranzaComponent', () => {
  let component: FormGestionFabricaLibranzaComponent;
  let fixture: ComponentFixture<FormGestionFabricaLibranzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestionFabricaLibranzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestionFabricaLibranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
