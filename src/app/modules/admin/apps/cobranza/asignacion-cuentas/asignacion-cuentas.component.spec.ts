import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionCuentasComponent } from './asignacion-cuentas.component';

describe('AsignacionCuentasComponent', () => {
  let component: AsignacionCuentasComponent;
  let fixture: ComponentFixture<AsignacionCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
