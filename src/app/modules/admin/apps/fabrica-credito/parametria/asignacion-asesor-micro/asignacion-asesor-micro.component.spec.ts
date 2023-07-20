import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionAsesorMicroComponent } from './asignacion-asesor-micro.component';

describe('AsignacionAsesorMicroComponent', () => {
  let component: AsignacionAsesorMicroComponent;
  let fixture: ComponentFixture<AsignacionAsesorMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionAsesorMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionAsesorMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
