import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoneraPagaduriaComponent } from './botonera-pagaduria.component';

describe('BotoneraPagaduriaComponent', () => {
  let component: BotoneraPagaduriaComponent;
  let fixture: ComponentFixture<BotoneraPagaduriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotoneraPagaduriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoneraPagaduriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
