import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-team-directory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-directory.html',
  styleUrls: ['./team-directory.css']
})
export class TeamDirectory implements OnInit {
  employees: any[] = [];
  errorMessage = '';
  loading = true;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.errorMessage = '';

    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response?.data?.getEmployees ?? [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load team members.';
        this.loading = false;
      }
    });
  }
}