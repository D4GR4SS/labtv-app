import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];



  constructor(private movieService : MoviesService) { }

  ngOnInit(): void {
    this.movieService.getMovies('popular').subscribe((movies)=>{
      this.popularMovies = movies;

    });
    
    this.movieService.getMovies('upcoming').subscribe((movies)=>{
      this.upcomingMovies = movies;
      
    });   
    
    this.movieService.getMovies('top_rated').subscribe((movies)=>{
      this.topRatedMovies = movies;
    });

  }

}
