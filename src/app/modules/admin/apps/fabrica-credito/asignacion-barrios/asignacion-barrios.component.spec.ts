import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionBarriosComponent } from './asignacion-barrios.component';

describe('AsignacionBarriosComponent', () => {
  let component: AsignacionBarriosComponent;
  let fixture: ComponentFixture<AsignacionBarriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionBarriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionBarriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
