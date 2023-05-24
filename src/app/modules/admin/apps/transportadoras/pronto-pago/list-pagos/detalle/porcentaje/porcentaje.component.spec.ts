import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeComponent } from './porcentaje.component';

describe('PorcentajeComponent', () => {
  let component: PorcentajeComponent;
  let fixture: ComponentFixture<PorcentajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorcentajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorcentajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
