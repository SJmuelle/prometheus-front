import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMasivoComponent } from './pago-masivo.component';

describe('PagoMasivoComponent', () => {
  let component: PagoMasivoComponent;
  let fixture: ComponentFixture<PagoMasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoMasivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
