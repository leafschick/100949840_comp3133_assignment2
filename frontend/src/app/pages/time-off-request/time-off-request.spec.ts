import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffRequest } from './time-off-request';

describe('TimeOffRequest', () => {
  let component: TimeOffRequest;
  let fixture: ComponentFixture<TimeOffRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeOffRequest],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeOffRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
