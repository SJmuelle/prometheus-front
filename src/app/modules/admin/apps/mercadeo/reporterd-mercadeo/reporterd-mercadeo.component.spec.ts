import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterdMercadeoComponent } from './reporterd-mercadeo.component';

describe('ReporterdMercadeoComponent', () => {
  let component: ReporterdMercadeoComponent;
  let fixture: ComponentFixture<ReporterdMercadeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporterdMercadeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporterdMercadeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
