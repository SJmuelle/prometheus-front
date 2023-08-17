import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNegociacionesComponent } from './consulta-negociaciones.component';

describe('ConsultaNegociacionesComponent', () => {
  let component: ConsultaNegociacionesComponent;
  let fixture: ComponentFixture<ConsultaNegociacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaNegociacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNegociacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
