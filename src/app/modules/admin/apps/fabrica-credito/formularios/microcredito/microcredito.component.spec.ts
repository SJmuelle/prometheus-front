import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrocreditoComponent } from './microcredito.component';

describe('MicrocreditoComponent', () => {
  let component: MicrocreditoComponent;
  let fixture: ComponentFixture<MicrocreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrocreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrocreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
