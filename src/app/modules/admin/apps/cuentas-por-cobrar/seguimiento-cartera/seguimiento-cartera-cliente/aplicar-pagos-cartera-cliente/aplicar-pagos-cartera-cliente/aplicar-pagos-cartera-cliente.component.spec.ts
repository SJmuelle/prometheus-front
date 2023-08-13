import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicarPagosCarteraClienteComponent } from './aplicar-pagos-cartera-cliente.component';

describe('AplicarPagosCarteraClienteComponent', () => {
  let component: AplicarPagosCarteraClienteComponent;
  let fixture: ComponentFixture<AplicarPagosCarteraClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicarPagosCarteraClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicarPagosCarteraClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
