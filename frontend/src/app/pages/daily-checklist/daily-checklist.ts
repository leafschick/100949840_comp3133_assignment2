import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    console.log('Daily Checklist:', this.form);

    this.successMessage = 'Daily checklist submitted successfully!';

    this.form = {
      employeeName: '',
      shiftType: 'Opening',
      checklistItems: [],
      notes: ''
    };
  }
}