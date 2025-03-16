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
import { UpdateUserFormComponent } from '../update-user-form/update-user-form.component';
import { UserService } from '../services/user.service';

/**
 * Component for the user profile page.
 * Displays user information, watchlist, and favorites.
 * Allows updating user details and viewing additional movie information.
 */
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
  /**
   * The username of the logged-in user.
   */
  username: string = '';

  /**
   * The email of the logged-in user.
   */
  email: string = '';

  /**
   * The list of movies in the user's watchlist.
   */
  watchlist: any[] = [];

  /**
   * The list of movies marked as favorites by the user.
   */
  favorites: any[] = [];

  /**
   * Creates an instance of ProfilePageComponent.
   * @param {UserService} userService - Service for retrieving user profile information.
   * @param {MatSnackBar} snackBar - Snackbar service for displaying notifications.
   * @param {MatDialog} dialog - Dialog service for displaying additional information.
   */
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook that is called after component initialization.
   * Fetches user profile data.
   */
  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * Retrieves the user's profile information, including username, email, watchlist, and favorites.
   * Displays an error in the console if the request fails.
   */
  getUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (user) => {
        this.username = user.username;
        this.email = user.Email;
        this.watchlist = user.Watchlist;
        this.favorites = user.Favorites || [];
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  /**
   * Removes a movie from the user's favorites list and displays a notification.
   * @param {any} movie - The movie object to be removed from favorites.
   */
  removeTitleFromFavorites(movie: any): void {
    this.favorites = this.favorites.filter((fav) => fav.Title !== movie.Title);
    this.snackBar.open('Movie removed from favorites', 'Success', {
      duration: 2000,
    });
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
      data: { title: movie.Title, description: movie.Description },
      width: '600px',
    });
  }
}
