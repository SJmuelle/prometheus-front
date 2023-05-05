import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReferenciacionComponent } from './ver-referenciacion.component';

describe('VerReferenciacionComponent', () => {
  let component: VerReferenciacionComponent;
  let fixture: ComponentFixture<VerReferenciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerReferenciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReferenciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
