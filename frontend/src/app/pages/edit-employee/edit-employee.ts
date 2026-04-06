import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './edit-employee.html',
  styleUrls: ['./edit-employee.css']
})
export class EditEmployee implements OnInit {
  employeeId = '';
  firstName = '';
  lastName = '';
  email = '';
  department = '';
  position = '';
  image = '';

  loading = true;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeId = id;
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
        const employee = response?.data?.getEmployeeById;

        if (employee) {
          this.firstName = employee.firstName || '';
          this.lastName = employee.lastName || '';
          this.email = employee.email || '';
          this.department = employee.department || '';
          this.position = employee.position || '';
          this.image = employee.image || '';
        } else {
          this.errorMessage = 'Cannot find employee.';
        }

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Sorry, failed to load the employee data.';
        this.loading = false;
      }
    });
  }

  updateEmployee() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.firstName || !this.lastName || !this.email || !this.department || !this.position) {
      this.errorMessage = 'You must fill in all required fields.';
      return;
    }

    const updatedEmployee = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      department: this.department.trim(),
      position: this.position.trim(),
      image: this.image.trim()
    };

    this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
      next: (response) => {
        if (response?.data?.updateEmployee) {
          this.successMessage = 'Employee has been updated successfully!';

          setTimeout(() => {
            this.router.navigate(['/employees']);
          }, 1000);
        } else if (response?.errors?.length) {
          this.errorMessage = response.errors[0].message;
        } else {
          this.errorMessage = 'Sorry, failed to update employee.';
        }
      },
      error: (error) => {
        console.error('Update employee error:', error);
        this.errorMessage =
          error?.error?.errors?.[0]?.message ||
          error?.message ||
          'Sorry, failed to update employee.';
      }
    });
  }
}