import { Component, OnInit } from '@angular/core';
import { TvshowService } from 'src/app/services/tvshow.service';
import { Movie } from '../../models/movie';
import { Tv } from '../../models/tv';

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
  popularTvShows: Tv[] = [];



  constructor(private moviesService : MoviesService, private tvService: TvshowService) { }

  ngOnInit(): void {
    this.moviesService.getMovies('now_playing').subscribe((movies)=>{
      this.popularMovies = movies;

    });
    
    this.moviesService.getMovies('popular').subscribe((movies)=>{
      this.upcomingMovies = movies;
      
    });   
    
    this.moviesService.getMovies('top_rated').subscribe((movies)=>{
      this.topRatedMovies = movies;
    });

    this.tvService.getTvs('top_rated').subscribe((tvShows) => {
      this.popularTvShows = tvShows;
    });

  }

}
