import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestionFabricaLibranzaPublicaComponent } from './form-gestion-fabrica-libranza-publica.component';

describe('FormGestionFabricaLibranzaPublicaComponent', () => {
  let component: FormGestionFabricaLibranzaPublicaComponent;
  let fixture: ComponentFixture<FormGestionFabricaLibranzaPublicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGestionFabricaLibranzaPublicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestionFabricaLibranzaPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
