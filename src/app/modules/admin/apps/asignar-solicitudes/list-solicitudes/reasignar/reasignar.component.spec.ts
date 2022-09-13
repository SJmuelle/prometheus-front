/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReasignarComponent } from './reasignar.component';

describe('ReasignarComponent', () => {
  let component: ReasignarComponent;
  let fixture: ComponentFixture<ReasignarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasignarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
