/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridCarteraComponent } from './grid-cartera.component';

describe('GridCarteraComponent', () => {
  let component: GridCarteraComponent;
  let fixture: ComponentFixture<GridCarteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCarteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
