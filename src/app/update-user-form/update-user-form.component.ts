import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { UpdateInfoUserService } from '../fetch-api-data.service';

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
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.scss'],
})
export class UpdateUserFormComponent implements OnInit {
  @Input() userData = {
    UserName: '',
    Password: '',
    Email: '',
    Birthdate: new Date(),
  };

  constructor(
    public fetchApiData: UpdateInfoUserService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

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
