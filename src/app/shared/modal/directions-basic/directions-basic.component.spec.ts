import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsBasicComponent } from './directions-basic.component';

describe('DirectionsBasicComponent', () => {
  let component: DirectionsBasicComponent;
  let fixture: ComponentFixture<DirectionsBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectionsBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
