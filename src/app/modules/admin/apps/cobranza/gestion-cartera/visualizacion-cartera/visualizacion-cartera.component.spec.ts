import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionCarteraComponent } from './visualizacion-cartera.component';

describe('VisualizacionCarteraComponent', () => {
  let component: VisualizacionCarteraComponent;
  let fixture: ComponentFixture<VisualizacionCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizacionCarteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacionCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
