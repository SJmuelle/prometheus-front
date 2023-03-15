import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecalcularOfertaConsumoPlexaComponent } from './recalcular-oferta-consumo-plexa.component';

describe('RecalcularOfertaConsumoPlexaComponent', () => {
  let component: RecalcularOfertaConsumoPlexaComponent;
  let fixture: ComponentFixture<RecalcularOfertaConsumoPlexaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecalcularOfertaConsumoPlexaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecalcularOfertaConsumoPlexaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
