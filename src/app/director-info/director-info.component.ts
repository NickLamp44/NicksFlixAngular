import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for displaying director information in a dialog.
 * Provides details about a movie director.
 */
@Component({
  selector: 'app-director-info',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss'],
})
export class DirectorInfoComponent {
  /**
   * The director information passed from the parent component.
   */
  Director: any;

  /**
   * Creates an instance of DirectorInfoComponent.
   * @param {MatDialogRef<DirectorInfoComponent>} dialogRef - Reference to the dialog containing this component.
   * @param {any} data - The director information provided via the dialog data.
   */
  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Use the passed-in data instead of making a second API call
    this.Director = data;
  }

  /**
   * Closes the director information dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
