import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ToolbarComponent } from '../toolbar/toolbar.component';
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
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  username: string = '';
  watchlist: any[] = [];
  favorites: any[] = [];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavMovies();
  }

  getUser(): void {
    // Simulating API call to fetch user details
    const user = {
      _id: '67d081ff67c3e8fd048057a5',
      username: 'AngularTest',
      Email: 'test@email.com',
      Watchlist: [],
    };

    this.username = user.username;
    this.watchlist = user.Watchlist;
  }

  getFavMovies(): void {
    // Simulating API call for favorites
    this.favorites = [
      {
        Title: 'Silence of the Lambs',
        Genre: { Name: 'Thriller' },
        Director: { Name: 'Jonathan Demme' },
        ImgPath: 'SilenceOfTheLambsPoster.jpg',
      },
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
      data: movie.Director,
      width: '600px',
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: { title: movie.Title, description: movie.Description },
      width: '600px',
    });
  }
}
