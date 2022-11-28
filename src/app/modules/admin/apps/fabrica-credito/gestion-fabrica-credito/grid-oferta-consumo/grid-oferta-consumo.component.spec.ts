import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOfertaConsumoComponent } from './grid-oferta-consumo.component';

describe('GridOfertaConsumoComponent', () => {
  let component: GridOfertaConsumoComponent;
  let fixture: ComponentFixture<GridOfertaConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridOfertaConsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOfertaConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
