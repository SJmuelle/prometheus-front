import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTrazabilidadComponent } from './detalle-trazabilidad.component';

describe('DetalleTrazabilidadComponent', () => {
  let component: DetalleTrazabilidadComponent;
  let fixture: ComponentFixture<DetalleTrazabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTrazabilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTrazabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
