import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { UserRegistrationService } from '../fetch-api-data.service';

/**
 * Component for user registration form.
 * Allows users to register by entering a username, password, email, and birthday.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  providers: [UserRegistrationService],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Object holding user registration data.
   * @property {string} username - The username of the user.
   * @property {string} password - The password of the user.
   * @property {string} Email - The email of the user.
   * @property {string} Birthday - The birthday of the user.
   */
  @Input() userData = {
    username: '',
    password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param {UserRegistrationService} fetchApiData - Service for handling user registration API requests.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog containing this component.
   * @param {MatSnackBar} snackBar - Snackbar service for displaying notifications.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by sending user data to the API.
   * Displays a success message if registration is successful,
   * otherwise displays an error message.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close();
        this.snackBar.open(
          'Registration successful! You can now log in.',
          'OK',
          { duration: 2000 }
        );
      },
      (error) => {
        this.snackBar.open('Registration failed. Please try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
