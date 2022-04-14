import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { TvDto } from '../models/tv';
import { of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl: string = 'https://api.themoviedb.org/3';
  apikey: string = '95a239540835902f14accd4ba073e2fd';
  
  
  constructor(private http: HttpClient) { }

  getMovies(type: string = 'upcoming', count: number = 12){
    
    return this.http.get<MovieDto>(
      `${this.baseUrl}/movie/${type}?api_key=${this.apikey}&language=it-IT`).pipe(switchMap(res =>{
        return of(res.results.slice(0, count))
      }));
  }

  getSimilarMovie(id: string){
    return this.http.get<MovieDto>(
      `${this.baseUrl}/movie/${id}/similar?api_key=${this.apikey}`).pipe(switchMap( res =>{
        return of (res.results)
      }))
  }

  searchMovies(page: number, searchValue?: string){
    const uri = searchValue ? '/search/movie' : '/movie/popular'
    return this.http.get<MovieDto>(
      `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apikey}&language=it-IT`).pipe(switchMap(res =>{
        return of(res.results)
      }));
  }

  getMovie(id: string){
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apikey}&language=it-IT`
    )
  }

  getMovieVideos(id: string){
    return this.http.get<MovieVideoDto>(
      `${this.baseUrl}/movie/${id}/videos?api_key=${this.apikey}`).pipe(switchMap(res =>{
        return of(res.results.slice(0, 1))
      }));
  }

  getMovieImages(id: string){
    return this.http.get<MovieImages>(
      `${this.baseUrl}/movie/${id}/images?api_key=${this.apikey}`
    )
  }

  getMovieCredits(id: string){
    return this.http.get<MovieCredits>(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apikey}`
    )
  }



  getTvs(type: string = 'latest', count: number = 12) {
    return this.http.get<TvDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apikey}&language=it-IT`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

}


// 'https://api.themoviedb.org/3/movie/upcoming?api_key=95a239540835902f14accd4ba073e2fd')