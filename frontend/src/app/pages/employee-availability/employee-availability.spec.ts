import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAvailability } from './employee-availability';

describe('EmployeeAvailability', () => {
  let component: EmployeeAvailability;
  let fixture: ComponentFixture<EmployeeAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAvailability],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAvailability);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
