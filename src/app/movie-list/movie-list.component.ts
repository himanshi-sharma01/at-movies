import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchKeyword: string = '';
  searchYearVar: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('/movies').subscribe(data => {
      this.movies = data;
      this.filteredMovies = data;
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/movie', id]);
  }

  search(): void {
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) &&
      (!this.searchYearVar || movie.release_date.startsWith(this.searchYearVar))
    );
  }

  searchYear(): void {
    this.search();
  }

  formatCurrency(budget: string): string {
    return `$${budget} million`;
  }

  formatDuration(duration: string): string {
    return `${duration} minutes`;
  }

  onSelectMovie(id: string): void {
    this.viewDetails(id);
  }
}
