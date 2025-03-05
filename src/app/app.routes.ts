import { Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const appRoutes: Routes = [
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];
