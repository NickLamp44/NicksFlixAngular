import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLoginService } from '../fetch-api-data.service';

/**
 * Component for user login form.
 * Allows users to log in by providing a username and password.
 */
@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent {
  /**
   * Object holding user login credentials.
   * @property {string} username - The username of the user.
   * @property {string} password - The password of the user.
   */
  userData = {
    username: '',
    password: '',
  };

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param {UserLoginService} loginService - Service for handling user login API requests.
   * @param {MatSnackBar} snackBar - Snackbar service for displaying notifications.
   * @param {Router} router - Router service for navigating between pages.
   */
  constructor(
    private loginService: UserLoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Logs in the user by sending their credentials to the API.
   * If login is successful, stores authentication token and user data in local storage,
   * displays a success message, and redirects to the movies page.
   * If login fails, displays an error message.
   */
  loginUser(): void {
    console.log('Logging in user:', this.userData);

    this.loginService.loginUser(this.userData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);

        // Store token for authentication persistence
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));

        // Success message
        this.snackBar.open('Login successful', 'OK', { duration: 2000 });

        // Redirect to movies page
        this.router.navigate(['/movies']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.snackBar.open(
          'Login failed. Please check your credentials.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
