/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridOfertaLibranzaComponent } from './grid-oferta-libranza.component';

describe('GridOfertaLibranzaComponent', () => {
  let component: GridOfertaLibranzaComponent;
  let fixture: ComponentFixture<GridOfertaLibranzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridOfertaLibranzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOfertaLibranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
