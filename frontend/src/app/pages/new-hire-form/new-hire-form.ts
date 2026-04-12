import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  submitForm() {
    console.log('New Hire Form:', this.form);

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
  }
}