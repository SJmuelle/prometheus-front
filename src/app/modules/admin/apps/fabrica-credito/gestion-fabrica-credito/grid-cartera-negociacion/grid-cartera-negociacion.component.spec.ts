/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridCarteraNegociacionComponent } from './grid-cartera-negociacion.component';

describe('GridCarteraNegociacionComponent', () => {
  let component: GridCarteraNegociacionComponent;
  let fixture: ComponentFixture<GridCarteraNegociacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCarteraNegociacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCarteraNegociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
