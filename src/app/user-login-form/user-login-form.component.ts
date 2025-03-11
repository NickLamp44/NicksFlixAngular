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
  userData = {
    username: '',
    password: '',
  };

  constructor(
    private loginService: UserLoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  loginUser(): void {
    console.log('Logging in user:', this.userData);

    this.loginService.loginUser(this.userData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);

        // Store token for authentication persistence
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', this.userData.username);

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
