import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-new-hire-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-hire-form.html',
  styleUrls: ['./new-hire-form.css']
})
export class NewHireForm {
  form = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    department: '',
    startDate: '',
    emergencyContact: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    this.employeeService
      .submitNewHireForm(
        this.form.fullName,
        this.form.email,
        this.form.phoneNumber,
        this.form.position,
        this.form.department,
        this.form.startDate,
        this.form.emergencyContact
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.submitNewHireForm) {
            this.successMessage = 'New hire form submitted successfully!';
            this.form = {
              fullName: '',
              email: '',
              phoneNumber: '',
              position: '',
              department: '',
              startDate: '',
              emergencyContact: ''
            };
          } else {
            this.errorMessage = 'Failed to submit new hire form.';
          }
        },
        error: (error) => {
          console.error('Submit new hire form error:', error);
          this.errorMessage =
            error?.error?.errors?.[0]?.message || 'Failed to submit new hire form.';
        }
      });
  }
}