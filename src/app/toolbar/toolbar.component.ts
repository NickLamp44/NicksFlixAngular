import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Toolbar Component providing navigation options.
 */
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

  navigateToWelcome(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  isOnProfileRoute(): boolean {
    return this.router.url === '/profile';
  }

  isOnMoviesRoute(): boolean {
    return this.router.url === '/movies';
  }
}
