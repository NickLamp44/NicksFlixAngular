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
    private movieService: MovieService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.loadFavorites();
  }

  fetchMovies(): void {
    this.movieService.getMovies().subscribe(
      (data) => (this.movies = data),
      (error) => console.error('Error fetching movies:', error)
    );
  }

  loadFavorites(): void {
    // Fetch user favorites from localStorage (or update from backend if needed)
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
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

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie)) {
      this.removeTitleFromFavorites(movie);
    } else {
      this.addTitleToFavorites(movie);
    }
  }

  addTitleToFavorites(movie: any): void {
    this.movieService.addToFavorites(movie.Title).subscribe(
      () => {
        this.favorites.push(movie.Title);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.snackBar.open('Movie added to favorites', 'Success', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error adding to favorites:', error);
        this.snackBar.open('Error adding to favorites', 'Error', {
          duration: 2000,
        });
      }
    );
  }

  removeTitleFromFavorites(movie: any): void {
    this.movieService.removeFromFavorites(movie.Title).subscribe(
      () => {
        this.favorites = this.favorites.filter(
          (title) => title !== movie.Title
        );
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.snackBar.open('Movie removed from favorites', 'Success', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error removing from favorites:', error);
        this.snackBar.open('Error removing from favorites', 'Error', {
          duration: 2000,
        });
      }
    );
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
