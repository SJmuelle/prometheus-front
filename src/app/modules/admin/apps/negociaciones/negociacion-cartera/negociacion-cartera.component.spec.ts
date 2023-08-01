import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociacionCarteraComponent } from './negociacion-cartera.component';

describe('NegociacionCarteraComponent', () => {
  let component: NegociacionCarteraComponent;
  let fixture: ComponentFixture<NegociacionCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegociacionCarteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociacionCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
