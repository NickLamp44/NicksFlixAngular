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

/**
 * Component for displaying movie cards.
 * Allows users to browse movies, view director info, synopsis, and manage watchlist.
 */
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
  /**
   * List of movies retrieved from the API.
   */
  movies: any[] = [];

  /**
   * List of favorite movie IDs.
   */
  favorites: string[] = [];

  /**
   * Whether to show the left scroll arrow.
   */
  showLeftArrow: boolean = false;

  /**
   * Whether to show the right scroll arrow.
   */
  showRightArrow: boolean = true;

  /**
   * Creates an instance of MovieCardComponent.
   * @param {MovieService} movieService - Service for retrieving movies and managing watchlist.
   * @param {MatDialog} dialog - Dialog service for displaying additional information.
   * @param {MatSnackBar} snackBar - Snackbar service for displaying notifications.
   */
  constructor(
    private movieService: MovieService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after component initialization.
   * Fetches movies and loads the user's favorite movies.
   */
  ngOnInit(): void {
    this.fetchMovies();
    this.loadFavorites();
  }

  /**
   * Fetches movies from the API and stores them in the `movies` array.
   */
  fetchMovies(): void {
    this.movieService.getMovies().subscribe(
      (data) => (this.movies = data),
      (error) => console.error('Error fetching movies:', error)
    );
  }

  /**
   * Loads the user's favorite movies from local storage.
   */
  loadFavorites(): void {
    // Fetch user favorites from localStorage (or update from backend if needed)
    const storedFavorites = localStorage.getItem('Watchist');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  /**
   * Opens a dialog displaying the director's information for a given movie.
   * @param {any} movie - The movie object containing director information.
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: movie.Director,
      width: '600px',
    });
  }

  /**
   * Opens a dialog displaying the synopsis of a given movie.
   * @param {any} movie - The movie object containing title and description.
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: movie,
      width: '600px',
    });
  }

  /**
   * Checks if a movie is in the user's list of favorite movies.
   * @param {any} movie - The movie object to check.
   * @returns {boolean} - Returns `true` if the movie is a favorite, otherwise `false`.
   */
  isFavorite(movie: any): boolean {
    return this.favorites.includes(movie.Title);
  }

  /**
   * Toggles the favorite status of a movie.
   * Adds or removes the movie from the user's watchlist.
   * @param {any} movie - The movie object to toggle.
   */
  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie)) {
      this.removeTitleFromFavorites(movie);
    } else {
      this.addTitleToFavorites(movie);
    }
  }

  /**
   * Adds a movie to the user's watchlist and updates local storage.
   * @param {any} movie - The movie object to add to the watchlist.
   */
  addTitleToFavorites(movie: any): void {
    this.movieService.addToWatchlist(movie._id).subscribe(
      (updatedUser) => {
        this.favorites.push(movie._id);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.snackBar.open(
          `${movie.Title} added to your watchlist!`,
          'Success',
          {
            duration: 2000,
          }
        );
      },
      (error) => {
        console.error('Error adding to watchlist:', error);
        this.snackBar.open(
          'Failed to add movie to watchlist. Please try again.',
          'Error',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  /**
   * Removes a movie from the user's watchlist and updates local storage.
   * @param {any} movie - The movie object to remove from the watchlist.
   */
  removeTitleFromFavorites(movie: any): void {
    this.movieService.removeFromFavorites(movie._id).subscribe(
      () => {
        this.favorites = this.favorites.filter((id) => id !== movie._id);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.snackBar.open(
          `${movie.Title} removed from your watchlist.`,
          'Success',
          {
            duration: 2000,
          }
        );
      },
      (error) => {
        console.error('Error removing from watchlist:', error);
        this.snackBar.open('Failed to remove movie from watchlist.', 'Error', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Scrolls the movie list horizontally.
   * @param {number} direction - The direction to scroll (positive for right, negative for left).
   */
  scroll(direction: number): void {
    const container = document.querySelector('.movie-grid');
    if (container) {
      const scrollAmount = direction * 300;
      container.scrollLeft += scrollAmount;
      this.updateArrowVisibility(container);
    }
  }

  /**
   * Updates the visibility of left and right scroll arrows based on the scroll position.
   * @param {HTMLElement} container - The movie list container element.
   */
  updateArrowVisibility(container: any): void {
    this.showLeftArrow = container.scrollLeft > 0;
    this.showRightArrow =
      container.scrollLeft < container.scrollWidth - container.clientWidth;
  }
}
