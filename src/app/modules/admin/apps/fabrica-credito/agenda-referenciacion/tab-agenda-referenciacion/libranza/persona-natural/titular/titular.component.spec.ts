/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LibranzaTitularComponent } from './titular.component';

describe('TitularComponent', () => {
  let component: LibranzaTitularComponent;
  let fixture: ComponentFixture<LibranzaTitularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibranzaTitularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibranzaTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
