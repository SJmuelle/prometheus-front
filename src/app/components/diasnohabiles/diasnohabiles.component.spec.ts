import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasnohabilesComponent } from './diasnohabiles.component';

describe('DiasnohabilesComponent', () => {
  let component: DiasnohabilesComponent;
  let fixture: ComponentFixture<DiasnohabilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiasnohabilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiasnohabilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
