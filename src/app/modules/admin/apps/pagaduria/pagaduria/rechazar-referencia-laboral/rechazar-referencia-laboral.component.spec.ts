import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarReferenciaLaboralComponent } from './rechazar-referencia-laboral.component';

describe('RechazarReferenciaLaboralComponent', () => {
  let component: RechazarReferenciaLaboralComponent;
  let fixture: ComponentFixture<RechazarReferenciaLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazarReferenciaLaboralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazarReferenciaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
