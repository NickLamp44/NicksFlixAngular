import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://nicks-flix-364389a40fe7.herokuapp.com/movies';
  private apiUrl2 = 'https://nicks-flix-364389a40fe7.herokuapp.com/users';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or sessionStorage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Attach token to request
    });

    return this.http.get<Movie[]>(this.apiUrl, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  addToWatchlist(movieId: string): Observable<any> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser._id;

    if (!userId) {
      throw new Error('User ID is missing!');
    }

    const url = `https://nicks-flix-364389a40fe7.herokuapp.com/users/${userId}/watchlist/${movieId}`;

    return this.http.post(url, {}, { headers: this.getAuthHeaders() });
  }

  removeFromFavorites(movieTitle: string): Observable<any> {
    const username = localStorage.getItem('username');
    return this.http.delete(
      `${this.apiUrl2}/${username}/movies/${encodeURIComponent(movieTitle)}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
