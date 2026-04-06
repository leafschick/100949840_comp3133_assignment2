import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './employee-detail.html',
  styleUrls: ['./employee-detail.css']
})
export class EmployeeDetail implements OnInit {
  employee: any = null;
  errorMessage = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadEmployee(id);
    } else {
      this.errorMessage = 'Employee ID not found.';
      this.loading = false;
    }
  }

  loadEmployee(id: string) {
    this.loading = true;
    this.errorMessage = '';

    this.employeeService.getEmployeeById(id).subscribe({
      next: (response) => {
        this.employee = response?.data?.getEmployeeById ?? null;
        this.loading = false;

        if (!this.employee) {
          this.errorMessage = 'Employee not found.';
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load employee details.';
        this.loading = false;
      }
    });
  }

  getInitials(): string {
    if (!this.employee) return '';
    const first = this.employee.firstName?.charAt(0) || '';
    const last = this.employee.lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  }
}