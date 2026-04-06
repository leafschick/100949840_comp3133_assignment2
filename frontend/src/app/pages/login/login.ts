import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.data?.login) {
          localStorage.setItem('user', JSON.stringify(response.data.login));
          this.successMessage = 'Login successful. Redirecting...';

          setTimeout(() => {
            this.router.navigate(['/employees']);
          }, 1000);
        } else if (response.errors?.length) {
          this.errorMessage = response.errors[0].message;
        }
      },
      error: () => {
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }
}