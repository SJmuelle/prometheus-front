import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfofileComponent } from './infofile.component';

describe('InfofileComponent', () => {
  let component: InfofileComponent;
  let fixture: ComponentFixture<InfofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
