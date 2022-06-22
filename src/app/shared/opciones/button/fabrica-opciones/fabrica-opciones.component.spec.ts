import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricaOpcionesComponent } from './fabrica-opciones.component';

describe('FabricaOpcionesComponent', () => {
  let component: FabricaOpcionesComponent;
  let fixture: ComponentFixture<FabricaOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricaOpcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricaOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
