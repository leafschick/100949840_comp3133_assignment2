import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollBenefits } from './payroll-benefits';

describe('PayrollBenefits', () => {
  let component: PayrollBenefits;
  let fixture: ComponentFixture<PayrollBenefits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollBenefits],
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollBenefits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
