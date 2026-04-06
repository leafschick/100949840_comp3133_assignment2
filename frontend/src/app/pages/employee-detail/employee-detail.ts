import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-employee-detail',
  imports: [RouterLink, CommonModule],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail {
  employee: any = null;
  errorMessage = '';
  loading = true;

  constructor ( 
    private route: ActivatedRoute,
    private employeeService: EmployeeService    
    ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(id);
    } else {
      this.errorMessage = 'Invalid employee ID.';
      this.loading = false;
    }
  }

  loadEmployee(id: string) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (response) => {
        this.employee = response.data?.getemployeeById || null;
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
    const firstInitial = this.employee.firstName ? this.employee.firstName.charAt(0).toUpperCase() : '';
    const lastInitial = this.employee.lastName ? this.employee.lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }
} 
