import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeList implements OnInit {
  employees: any[] = [];
  errorMessage = '';
  successMessage = '';
  loading = true;

  searchText = '';

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
        this.errorMessage = 'Failed to load employees.';
        this.loading = false;
      }
    });
  }

  searchEmployees() {
    const value = this.searchText.trim();

    if (!value) {
      this.loadEmployees();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.employeeService.searchEmployees(value, value).subscribe({
      next: (response) => {
        this.employees = response?.data?.searchEmployees ?? [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Search employee error:', error);
        this.errorMessage = 'Failed to search employees.';
        this.loading = false;
      }
    });
  }

  deleteEmployee(id: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');

    if (!confirmDelete) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        if (response?.data?.deleteEmployee) {
          this.successMessage = 'Employee deleted successfully!';
          this.loadEmployees();
        } else if (response?.errors?.length) {
          this.errorMessage = response.errors[0].message;
        } else {
          this.errorMessage = 'Failed to delete employee.';
        }
      },
      error: (error) => {
        console.error('Delete employee error:', error);
        this.errorMessage =
          error?.error?.errors?.[0]?.message ||
          error?.message ||
          'Failed to delete employee.';
      }
    });
  }
}