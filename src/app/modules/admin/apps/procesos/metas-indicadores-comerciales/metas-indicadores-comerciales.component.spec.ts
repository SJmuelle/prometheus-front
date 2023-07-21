import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetasIndicadoresComercialesComponent } from './metas-indicadores-comerciales.component';

describe('MetasIndicadoresComercialesComponent', () => {
  let component: MetasIndicadoresComercialesComponent;
  let fixture: ComponentFixture<MetasIndicadoresComercialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetasIndicadoresComercialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetasIndicadoresComercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
