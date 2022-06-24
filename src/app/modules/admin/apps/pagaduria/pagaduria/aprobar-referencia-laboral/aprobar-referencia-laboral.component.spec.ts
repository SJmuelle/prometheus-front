import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarReferenciaLaboralComponent } from './aprobar-referencia-laboral.component';

describe('AprobarReferenciaLaboralComponent', () => {
  let component: AprobarReferenciaLaboralComponent;
  let fixture: ComponentFixture<AprobarReferenciaLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobarReferenciaLaboralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarReferenciaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
