import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie [] = [];
  searchValue: string | null = null;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {

    this.getPagedMovies(1);
  }

  getPagedMovies(page: number, searcKeyword?: string){
    this.moviesService.searchMovies(page, searcKeyword).subscribe(movies =>{
      this.movies = movies;
    })
  }

  paginate(event: any){
    const pageNumber = event.page +1;
    if(this.searchValue){
      this.getPagedMovies(pageNumber, this.searchValue);
    } else {
      this.getPagedMovies(pageNumber);
    }

    // this.getPagedMovies(event.page +1);
  }

  searchChanged(){
    if(this.searchValue){
      this.getPagedMovies(1, this.searchValue);
    }
  }

}
