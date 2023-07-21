import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcepcionCreditoComponent } from './excepcion-credito.component';

describe('ExcepcionCreditoComponent', () => {
  let component: ExcepcionCreditoComponent;
  let fixture: ComponentFixture<ExcepcionCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcepcionCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcepcionCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
