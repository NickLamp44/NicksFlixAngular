import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { UpdateUserFormComponent } from '../update-user-form/update-user-form.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    ToolbarComponent,
    UpdateUserFormComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  username: string = 'User123';
  favorites: any[] = [];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getFavMovies();
  }

  getFavMovies(): void {
    this.favorites = [
      { Title: 'Movie 1', Director: 'Director 1' },
      { Title: 'Movie 2', Director: 'Director 2' },
    ];
  }

  removeTitleFromFavorites(movie: any): void {
    this.favorites = this.favorites.filter((fav) => fav.Title !== movie.Title);
    this.snackBar.open('Movie removed from favorites', 'Success', {
      duration: 2000,
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { directorName: movie.Director },
      width: '600px',
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: { movie },
      width: '600px',
    });
  }
}
