import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPqrComponent } from './historial-pqr.component';

describe('HistorialPqrComponent', () => {
  let component: HistorialPqrComponent;
  let fixture: ComponentFixture<HistorialPqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialPqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
