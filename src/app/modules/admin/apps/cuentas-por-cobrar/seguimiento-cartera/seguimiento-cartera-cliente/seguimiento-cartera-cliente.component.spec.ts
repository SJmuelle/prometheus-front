import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoCarteraClienteComponent } from './seguimiento-cartera-cliente.component';

describe('SeguimientoCarteraClienteComponent', () => {
  let component: SeguimientoCarteraClienteComponent;
  let fixture: ComponentFixture<SeguimientoCarteraClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeguimientoCarteraClienteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoCarteraClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
