import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

/**
 * Synopsis Component for displaying movie details.
 */
@Component({
  selector: 'app-synopsis',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule], // ✅ Import required Material Modules
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
})
export class SynopsisComponent {
  movie: any;

  constructor(
    public dialogRef: MatDialogRef<SynopsisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
