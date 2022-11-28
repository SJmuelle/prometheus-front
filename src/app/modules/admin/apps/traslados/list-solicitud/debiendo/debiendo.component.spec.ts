import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebiendoComponent } from './debiendo.component';

describe('DebiendoComponent', () => {
  let component: DebiendoComponent;
  let fixture: ComponentFixture<DebiendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebiendoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebiendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
