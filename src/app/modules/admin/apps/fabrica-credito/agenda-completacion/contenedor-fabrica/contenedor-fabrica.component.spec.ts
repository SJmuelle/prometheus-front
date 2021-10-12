import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorFabricaComponent } from './contenedor-fabrica.component';

describe('ContenedorFabricaComponent', () => {
  let component: ContenedorFabricaComponent;
  let fixture: ComponentFixture<ContenedorFabricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorFabricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorFabricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
