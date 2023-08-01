import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecalcularOfertaLibranzaComponent } from './recalcular-oferta-libranza.component';

describe('RecalcularOfertaLibranzaComponent', () => {
  let component: RecalcularOfertaLibranzaComponent;
  let fixture: ComponentFixture<RecalcularOfertaLibranzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecalcularOfertaLibranzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecalcularOfertaLibranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
