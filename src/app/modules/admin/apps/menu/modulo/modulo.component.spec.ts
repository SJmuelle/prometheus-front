import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloComponent } from './modulo.component';

describe('ModuloComponent', () => {
  let component: ModuloComponent;
  let fixture: ComponentFixture<ModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
