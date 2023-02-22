import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHistoricoClienteComponent } from './grid-historico-cliente.component';

describe('GridHistoricoClienteComponent', () => {
  let component: GridHistoricoClienteComponent;
  let fixture: ComponentFixture<GridHistoricoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridHistoricoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridHistoricoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
