import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolucionpqrsComponent } from '../solucionpqrs/solucionpqrs.component';

describe('SolucionpqrsComponent', () => {
  let component: SolucionpqrsComponent;
  let fixture: ComponentFixture<SolucionpqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolucionpqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolucionpqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
