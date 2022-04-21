import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { Tv, TvCredits, TvDto, TvImages, TvVideoDto } from '../models/tv';

@Injectable({
  providedIn: 'root'
})
export class TvshowService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://api.themoviedb.org/3';
  apikey: string = '95a239540835902f14accd4ba073e2fd';

  getTvs(type: string = 'top_rated', count: number = 24) {
    return this.http.get<TvDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apikey}&language=it-IT&region=IT`).pipe(
      switchMap((res) => {
        return of(res.results.slice(13, count));
      })
    );
  }

  searchTvShow(page: number, searchValue?: string){
    const uri = searchValue ? '/search/tv' : '/tv/top_rated'
    return this.http.get<TvDto>(
      `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apikey}&language=it`).pipe(switchMap(res =>{
        return of(res.results)
      }));
  }

  getTvShow(id: string){
    return this.http.get<Tv>(
      `${this.baseUrl}/tv/${id}?api_key=${this.apikey}&language=it`
    )
  }

  getTvShowsVideos(id: string){
    return this.http.get<TvVideoDto>(
      `${this.baseUrl}/tv/${id}/videos?api_key=${this.apikey}&include_video_language=it`).pipe(switchMap(res =>{
        return of(res.results.slice(0, 1))}));
  }

  getTvShowsImages(id: string){
    return this.http.get<TvImages>(
      `${this.baseUrl}/tv/${id}/images?api_key=${this.apikey}`
    )
  }

  getTvShowsCredits(id: string){
    return this.http.get<TvCredits>(
      `${this.baseUrl}/tv/${id}/credits?api_key=${this.apikey}`
    )
  }

}
