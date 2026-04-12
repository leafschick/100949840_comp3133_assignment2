import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  toggleDay(event: Event, day: string) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      this.form.availableDays.push(day);
    } else {
      this.form.availableDays = this.form.availableDays.filter(d => d !== day);
    }
  }

  submitForm() {
    console.log('Form Data:', this.form);

    this.successMessage = 'Availability submitted successfully!';

    this.form = {
      employeeName: '',
      availableDays: [],
      preferredShift: 'Morning'
    };
  }
}