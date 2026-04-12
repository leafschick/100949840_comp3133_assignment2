import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-availability.html',
  styleUrls: ['./employee-availability.css']
})
export class EmployeeAvailability {
  form = {
    employeeName: '',
    availableDays: [] as string[],
    preferredShift: 'Morning'
  };

  successMessage = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  toggleDay(event: Event, day: string) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      if (!this.form.availableDays.includes(day)) {
        this.form.availableDays.push(day);
      }
    } else {
      this.form.availableDays = this.form.availableDays.filter(d => d !== day);
    }
  }

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    this.employeeService
      .submitAvailability(
        this.form.employeeName,
        this.form.availableDays,
        this.form.preferredShift
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.submitAvailability) {
            this.successMessage = 'Availability submitted successfully!';
            this.form = {
              employeeName: '',
              availableDays: [],
              preferredShift: 'Morning'
            };
          } else {
            this.errorMessage = 'Failed to submit availability form.';
          }
        },
        error: (error) => {
          console.error('Submit availability error:', error);
          this.errorMessage =
            error?.error?.errors?.[0]?.message || 'Failed to submit availability form.';
        }
      });
  }
}