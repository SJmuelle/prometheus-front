import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojadevidaComponent } from './hojadevida.component';

describe('HojadevidaComponent', () => {
  let component: HojadevidaComponent;
  let fixture: ComponentFixture<HojadevidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HojadevidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HojadevidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
