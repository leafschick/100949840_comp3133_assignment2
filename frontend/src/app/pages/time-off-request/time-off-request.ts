import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  submitForm() {
    console.log('Time-Off Request:', this.form);

    this.successMessage = 'Time-off request submitted successfully!';

    this.form = {
      employeeName: '',
      startDate: '',
      endDate: '',
      reason: ''
    };
  }
}