import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://nicks-flix-364389a40fe7.herokuapp.com/movies';

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

  addToFavorites(movieTitle: string): Observable<any> {
    const username = localStorage.getItem('username');
    return this.http.post(
      `${this.apiUrl}/${username}/movies/${encodeURIComponent(movieTitle)}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  removeFromFavorites(movieTitle: string): Observable<any> {
    const username = localStorage.getItem('username');
    return this.http.delete(
      `${this.apiUrl}/${username}/movies/${encodeURIComponent(movieTitle)}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
