import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldiasnohabilesComponent } from './modaldiasnohabiles.component';

describe('ModaldiasnohabilesComponent', () => {
  let component: ModaldiasnohabilesComponent;
  let fixture: ComponentFixture<ModaldiasnohabilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldiasnohabilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldiasnohabilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
