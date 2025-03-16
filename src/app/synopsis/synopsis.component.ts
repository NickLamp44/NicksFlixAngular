import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for displaying a movie synopsis in a dialog.
 * Allows users to view a brief description of the movie and close the dialog.
 */
@Component({
  selector: 'app-synopsis',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
})
export class SynopsisComponent {
  /**
   * Creates an instance of SynopsisComponent.
   * @param {MatDialogRef<SynopsisComponent>} dialogRef - Reference to the dialog containing this component.
   * @param {any} movie - The movie data containing the synopsis and other details.
   */
  constructor(
    public dialogRef: MatDialogRef<SynopsisComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: any
  ) {}

  /**
   * Closes the synopsis dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
