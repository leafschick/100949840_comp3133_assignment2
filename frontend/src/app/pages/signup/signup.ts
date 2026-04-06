import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  fullName = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.fullName || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.authService.signup(this.fullName, this.email, this.password).subscribe({
      next: (response) => {
        if (response.data?.signup) {
          this.successMessage = 'Account created successfully. Redirecting to login...';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        } else if (response.errors?.length) {
          this.errorMessage = response.errors[0].message;
        }
      },
      error: () => {
        this.errorMessage = 'Signup failed. Please try again.';
      }
    });
  }
}