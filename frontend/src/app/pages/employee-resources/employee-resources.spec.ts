import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeResources } from './employee-resources';

describe('EmployeeResources', () => {
  let component: EmployeeResources;
  let fixture: ComponentFixture<EmployeeResources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeResources],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeResources);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
