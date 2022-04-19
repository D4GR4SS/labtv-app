import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IMAGE_SIZES } from 'src/app/constants/image-size';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  imagesSizes = IMAGE_SIZES;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.route.params.subscribe( ({id}) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    })
  }

  ngOnDestroy(): void {
  }

  getMovie(id: string){
    this.moviesService.getMovie(id).pipe(first()).subscribe(movieData =>{
    this.movie = movieData;
    console.log(this.movie);
    })
  }

  getMovieVideos(id: string){
    this.moviesService.getMovieVideos(id).subscribe(movieVideosData =>{
    this.movieVideos = movieVideosData;
    })
  }

  getMovieImages(id: string){
    this.moviesService.getMovieImages(id).subscribe((movieImagesData =>
      this.movieImages = movieImagesData))
  }

  getMovieCredits(id: string){
    this.moviesService.getMovieCredits(id).subscribe((movieCreditsData =>
      this.movieCredits = movieCreditsData))
  }

  getSimilarMovies(id: string){
    this.moviesService.getSimilarMovie(id).subscribe(similarMoviesData => {
      this.similarMovies = similarMoviesData;
      console.log(similarMoviesData)
    } )
  }

}
