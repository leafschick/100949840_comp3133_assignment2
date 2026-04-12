import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-incident-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incident-report.html',
  styleUrls: ['./incident-report.css']
})
export class IncidentReport {
  form = {
    employeeName: '',
    incidentDate: '',
    incidentType: '',
    description: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    this.employeeService
      .submitIncidentReport(
        this.form.employeeName,
        this.form.incidentDate,
        this.form.incidentType,
        this.form.description
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.submitIncidentReport) {
            this.successMessage = 'Incident report submitted successfully!';
            this.form = {
              employeeName: '',
              incidentDate: '',
              incidentType: '',
              description: ''
            };
          } else {
            this.errorMessage = 'Failed to submit incident report.';
          }
        },
        error: (error) => {
          console.error('Submit incident report error:', error);
          this.errorMessage =
            error?.error?.errors?.[0]?.message || 'Failed to submit incident report.';
        }
      });
  }
}