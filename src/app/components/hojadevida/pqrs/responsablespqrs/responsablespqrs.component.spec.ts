import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablespqrsComponent } from './responsablespqrs.component';

describe('ResponsablespqrsComponent', () => {
  let component: ResponsablespqrsComponent;
  let fixture: ComponentFixture<ResponsablespqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsablespqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsablespqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
