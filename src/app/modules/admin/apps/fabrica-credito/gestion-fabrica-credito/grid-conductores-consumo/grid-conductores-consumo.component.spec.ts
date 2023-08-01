import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridConductoresConsumoComponent } from './grid-conductores-consumo.component';

describe('GridConductoresConsumoComponent', () => {
  let component: GridConductoresConsumoComponent;
  let fixture: ComponentFixture<GridConductoresConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridConductoresConsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridConductoresConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
