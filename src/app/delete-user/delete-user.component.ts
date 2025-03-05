import { Component } from '@angular/core';
import { DeleteUserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

/**
 * Represents the Delete User Component.
 */
@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ConfirmationDialogComponent],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  constructor(
    private delUser: DeleteUserService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete your account?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUserData();
      }
    });
  }

  deleteUserData(): void {
    this.delUser.deleteUser().subscribe((resp: any) => {
      console.log(resp);
    });
    this.snackBar.open('Account deleted', 'Success', {
      duration: 2000,
    });
    this.router.navigate(['/welcome']);
  }
}
