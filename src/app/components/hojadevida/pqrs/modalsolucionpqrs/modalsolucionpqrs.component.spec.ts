import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsolucionpqrsComponent } from './modalsolucionpqrs.component';

describe('ModalsolucionpqrsComponent', () => {
  let component: ModalsolucionpqrsComponent;
  let fixture: ComponentFixture<ModalsolucionpqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsolucionpqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsolucionpqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
