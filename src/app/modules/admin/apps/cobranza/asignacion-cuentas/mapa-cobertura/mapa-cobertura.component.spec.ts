import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaCoberturaComponent } from './mapa-cobertura.component';

describe('MapaCoberturaComponent', () => {
  let component: MapaCoberturaComponent;
  let fixture: ComponentFixture<MapaCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaCoberturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
