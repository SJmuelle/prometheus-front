import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestionFabricaConsumoComponent } from './form-gestion-fabrica-consumo.component';

describe('FormGestionFabricaConsumoComponent', () => {
  let component: FormGestionFabricaConsumoComponent;
  let fixture: ComponentFixture<FormGestionFabricaConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGestionFabricaConsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestionFabricaConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
