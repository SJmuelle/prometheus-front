/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TitularComponent } from './titular.component';

describe('TitularComponent', () => {
  let component: TitularComponent;
  let fixture: ComponentFixture<TitularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
