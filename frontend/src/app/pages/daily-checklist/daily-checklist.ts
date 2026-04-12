import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-daily-checklist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-checklist.html',
  styleUrls: ['./daily-checklist.css']
})
export class DailyChecklist {
  form = {
    employeeName: '',
    shiftType: 'Opening',
    checklistItems: [] as string[],
    notes: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  toggleItem(event: Event, item: string) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      if (!this.form.checklistItems.includes(item)) {
        this.form.checklistItems.push(item);
      }
    } else {
      this.form.checklistItems = this.form.checklistItems.filter(i => i !== item);
    }
  }

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    this.employeeService
      .submitDailyChecklist(
        this.form.employeeName,
        this.form.shiftType,
        this.form.checklistItems,
        this.form.notes
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.submitDailyChecklist) {
            this.successMessage = 'Daily checklist submitted successfully!';
            this.form = {
              employeeName: '',
              shiftType: 'Opening',
              checklistItems: [],
              notes: ''
            };
          } else {
            this.errorMessage = 'Failed to submit daily checklist.';
          }
        },
        error: (error) => {
          console.error('Submit daily checklist error:', error);
          this.errorMessage =
            error?.error?.errors?.[0]?.message || 'Failed to submit daily checklist.';
        }
      });
  }
}