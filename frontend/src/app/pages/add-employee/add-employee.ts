import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './add-employee.html',
  styleUrls: ['./add-employee.css']
})
export class AddEmployee {
  firstName = '';
  lastName = '';
  email = '';
  department = '';
  position = '';
  image = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  addEmployee() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.firstName || !this.lastName || !this.email || !this.department || !this.position) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const employeeData = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      department: this.department.trim(),
      position: this.position.trim(),
      image: this.image.trim()
    };

    console.log('Sending employee data:', employeeData);

    this.employeeService.addEmployee(employeeData).subscribe({
      next: (response) => {
        console.log('Add employee response:', response);

        if (response.data?.addEmployee) {
          this.successMessage = 'Employee added successfully!';

          setTimeout(() => {
            this.router.navigate(['/employees']);
          }, 1000);
        } else if (response.errors?.length) {
          this.errorMessage = response.errors[0].message;
        } else {
          this.errorMessage = 'Failed to add employee.';
        }
      },
      error: (error) => {
        console.error('Add employee error:', error);
        this.errorMessage =
          error?.error?.errors?.[0]?.message ||
          error?.message ||
          'Failed to add employee.';
      }
    });
  }
}