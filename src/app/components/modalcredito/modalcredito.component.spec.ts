import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcreditoComponent } from './modalcredito.component';

describe('ModalcreditoComponent', () => {
  let component: ModalcreditoComponent;
  let fixture: ComponentFixture<ModalcreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalcreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
