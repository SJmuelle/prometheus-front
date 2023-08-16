import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCarteraComponent } from './detalle-cartera.component';

describe('DetalleCarteraComponent', () => {
  let component: DetalleCarteraComponent;
  let fixture: ComponentFixture<DetalleCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCarteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
