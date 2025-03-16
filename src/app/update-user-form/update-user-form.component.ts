import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { UpdateInfoUserService } from '../fetch-api-data.service';

/**
 * Component for updating user information.
 * Allows users to update their username, password, email, and birthdate.
 */
@Component({
  selector: 'app-update-user-form',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    DeleteUserComponent,
  ],
  providers: [UpdateInfoUserService],
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.scss'],
})
export class UpdateUserFormComponent implements OnInit {
  /**
   * Object holding user update data.
   * @property {string} UserName - The updated username of the user.
   * @property {string} Password - The updated password of the user.
   * @property {string} Email - The updated email of the user.
   * @property {Date} Birthdate - The updated birthdate of the user.
   */
  @Input() userData = {
    UserName: '',
    Password: '',
    Email: '',
    Birthdate: new Date(),
  };

  /**
   * Service for updating user information.
   */
  public fetchApiData = inject(UpdateInfoUserService);

  /**
   * Snackbar service for displaying notifications.
   */
  public snackBar = inject(MatSnackBar);

  /**
   * Creates an instance of UpdateUserFormComponent.
   */
  constructor() {}

  /**
   * Lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Updates the user's information by sending the new data to the API.
   * If the update is successful, the userData is updated and a success message is displayed.
   * If the update fails, an error message is displayed.
   */
  updateUser(): void {
    this.fetchApiData.updateInfoUser(this.userData).subscribe(
      (resp: any) => {
        this.userData = resp;
        this.snackBar.open('Update', 'Success', {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open('Please try again', 'No success', {
          duration: 2000,
        });
      }
    );
  }
}
