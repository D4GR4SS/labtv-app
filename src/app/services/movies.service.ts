import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { TvDto } from '../models/tv';
import { of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {


  
  constructor(private http: HttpClient) { }

  getMovies(type: string = 'upcoming', count: number = 18){
    
    return this.http.get<MovieDto>(
      `${environment.baseUrl}/movie/${type}?api_key=${environment.apikey}&language=it-IT&region=IT`).pipe(switchMap(res =>{
        return of(res.results.slice(0, count))
      }));
  }

  getSimilarMovie(id: string, count: number = 12) {
    return this.http
      .get<MovieDto>(`${environment.baseUrl}/movie/${id}/similar?api_key=${environment.apikey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  searchMovies(page: number, searchValue?: string){
    const uri = searchValue ? '/search/movie' : '/movie/popular'
    return this.http.get<MovieDto>(
      `${environment.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${environment.apikey}&language=it-IT`).pipe(switchMap(res =>{
        return of(res.results)
      }));
  }

  getMovie(id: string){
    return this.http.get<Movie>(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apikey}&language=it-IT`
    )
  }

  getMovieVideos(id: string){
    return this.http.get<MovieVideoDto>(
      `${environment.baseUrl}/movie/${id}/videos?api_key=${environment.apikey}&include_video_language=it`).pipe(switchMap(res =>{
        return of(res.results.slice(0, 1))
      }));
  }

  getMovieImages(id: string){
    return this.http.get<MovieImages>(
      `${environment.baseUrl}/movie/${id}/images?api_key=${environment.apikey}`
    )
  }

  getMovieCredits(id: string){
    return this.http.get<MovieCredits>(
      `${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apikey}`
    )
  }



  // getTvs(type: string = 'latest', count: number = 12) {
  //   return this.http.get<TvDto>(`${environment.baseUrl}/tv/${type}?api_key=${environment.apikey}&language=it-IT`).pipe(
  //     switchMap((res) => {
  //       return of(res.results.slice(0, count));
  //     })
  //   );
  // }

}


// 'https://api.themoviedb.org/3/movie/upcoming?api_key=95a239540835902f14accd4ba073e2fd')