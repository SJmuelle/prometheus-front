import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagaduriaComponent } from './pagaduria.component';

describe('PagaduriaComponent', () => {
  let component: PagaduriaComponent;
  let fixture: ComponentFixture<PagaduriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagaduriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagaduriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
