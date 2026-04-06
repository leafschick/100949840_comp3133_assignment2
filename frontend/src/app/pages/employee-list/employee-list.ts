import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeList implements OnInit {
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
        this.employees = response.data?.getEmployees || [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load employees.';
        this.loading = false;
      }
    });
  }
}