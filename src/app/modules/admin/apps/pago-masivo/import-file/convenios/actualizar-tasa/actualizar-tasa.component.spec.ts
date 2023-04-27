import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTasaComponent } from './actualizar-tasa.component';

describe('ActualizarTasaComponent', () => {
  let component: ActualizarTasaComponent;
  let fixture: ComponentFixture<ActualizarTasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarTasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarTasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
