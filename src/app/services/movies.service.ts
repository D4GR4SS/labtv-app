import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MovieDto } from '../models/movie';
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
      `${this.baseUrl}/movie/${type}?api_key=${this.apikey}`).pipe(switchMap(res =>{
        return of(res.results.slice(0, count))
      }));
      
  }

}


// 'https://api.themoviedb.org/3/movie/upcoming?api_key=95a239540835902f14accd4ba073e2fd')