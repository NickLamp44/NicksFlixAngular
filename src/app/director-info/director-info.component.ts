import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectorService } from '../fetch-api-data.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-director-info',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss'],
})
export class DirectorInfoComponent implements OnInit {
  director: any;
  movie: any;

  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    public fetchDirector: DirectorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  ngOnInit(): void {
    this.getDirectorDetails(this.data.directorName);
  }

  getDirectorDetails(directorName: string): void {
    this.fetchDirector.getDirector(directorName).subscribe((resp: any) => {
      this.director = resp;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
