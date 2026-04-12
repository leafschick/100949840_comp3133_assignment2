import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-time-off-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-off-request.html',
  styleUrls: ['./time-off-request.css']
})
export class TimeOffRequest {
  form = {
    employeeName: '',
    startDate: '',
    endDate: '',
    reason: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    this.employeeService
      .submitTimeOffRequest(
        this.form.employeeName,
        this.form.startDate,
        this.form.endDate,
        this.form.reason
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.submitTimeOffRequest) {
            this.successMessage = 'Time-off request submitted successfully!';
            this.form = {
              employeeName: '',
              startDate: '',
              endDate: '',
              reason: ''
            };
          } else {
            this.errorMessage = 'Failed to submit time-off request.';
          }
        },
        error: (error) => {
          console.error('Submit time-off request error:', error);
          this.errorMessage =
            error?.error?.errors?.[0]?.message || 'Failed to submit time-off request.';
        }
      });
  }
}