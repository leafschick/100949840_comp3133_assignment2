import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  submitForm() {
    console.log('Incident Report:', this.form);

    this.successMessage = 'Incident report submitted successfully!';

    this.form = {
      employeeName: '',
      incidentDate: '',
      incidentType: '',
      description: ''
    };
  }
}