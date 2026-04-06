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
  styleUrls: ['./add-employee.css'],
})
export class AddEmployee {
  firstName = '';
  lastName = '';
  email = '';
  position = '';
  department = '';
  image = '';

  errorMessage = '';
  successMessage = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  addEmployee() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.firstName || !this.lastName || !this.email || !this.position || !this.department) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.employeeService.addEmployee({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      position: this.position,
      department: this.department,
      image: this.image
    }).subscribe({
      next: (response) => {
        if (response.data?.addEmployee) {
          this.successMessage = 'Employee added successfully!';

          setTimeout(() => {
            this.router.navigate(['/employees']);
          }, 1000);
        } else if (response.errors?.length) {
          this.errorMessage = response.errors[0].message;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to add employee.';
      }
    });
  }
}