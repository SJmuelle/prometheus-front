import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablesPQRSComponent } from './responsables-pqrs.component';

describe('ResponsablesPQRSComponent', () => {
  let component: ResponsablesPQRSComponent;
  let fixture: ComponentFixture<ResponsablesPQRSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsablesPQRSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsablesPQRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
