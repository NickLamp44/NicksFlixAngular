import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    ToolbarComponent,
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: string[] = [];
  showLeftArrow: boolean = false;
  showRightArrow: boolean = true;

  constructor(
    private MovieService: MovieService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.MovieService.getMovies().subscribe(
      (data) => (this.movies = data),
      (error) => console.error('Error fetching movies:', error)
    );
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: movie.Director,
      width: '600px',
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: movie,
      width: '600px',
    });
  }

  isFavorite(movie: any): boolean {
    return this.favorites.includes(movie.Title);
  }

  addTitleToFavorites(movie: any): void {
    this.favorites.push(movie.Title);
    this.snackBar.open('Movie added to favorites', 'Success', {
      duration: 2000,
    });
  }

  removeTitleFromFavorites(movie: any): void {
    this.favorites = this.favorites.filter((title) => title !== movie.Title);
    this.snackBar.open('Movie removed from favorites', 'Success', {
      duration: 2000,
    });
  }

  scroll(direction: number): void {
    const container = document.querySelector('.movie-grid');
    if (container) {
      const scrollAmount = direction * 300;
      container.scrollLeft += scrollAmount;
      this.updateArrowVisibility(container);
    }
  }

  updateArrowVisibility(container: any): void {
    this.showLeftArrow = container.scrollLeft > 0;
    this.showRightArrow =
      container.scrollLeft < container.scrollWidth - container.clientWidth;
  }
}
