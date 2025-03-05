import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Import Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

// ✅ Import Standalone Components (All Components Are Now Standalone)
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DirectorInfoComponent } from './director-info/director-info.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { SynopsisComponent } from './synopsis/synopsis.component';

// ✅ Define Application Routes
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // ✅ Angular Material Modules
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,

    // ✅ Import All Standalone Components Here
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    ProfilePageComponent,
    DirectorInfoComponent,
    DeleteUserComponent,
    ConfirmationDialogComponent,
    ToolbarComponent,
    UpdateUserFormComponent,
    SynopsisComponent,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
})
export class AppModule {}
