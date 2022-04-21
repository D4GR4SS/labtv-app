import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tv, TvCredits, TvDto, TvImages, TvVideoDto } from '../models/tv';

@Injectable({
  providedIn: 'root'
})
export class TvshowService {

  constructor(private http: HttpClient) { }


  getTvs(type: string = 'popular', count: number = 12) {
    return this.http.get<TvDto>(`${environment.baseUrl}/tv/${type}?api_key=${environment.apikey}&language=it-IT&region=IT`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  searchTvShow(page: number, searchValue?: string){
    const uri = searchValue ? '/search/tv' : '/tv/top_rated'
    return this.http.get<TvDto>(
      `${environment.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${environment.apikey}&language=it`).pipe(switchMap(res =>{
        return of(res.results)
      }));
  }

  getTvShow(id: string){
    return this.http.get<Tv>(
      `${environment.baseUrl}/tv/${id}?api_key=${environment.apikey}&language=it`
    )
  }

  getTvShowsVideos(id: string){
    return this.http.get<TvVideoDto>(
      `${environment.baseUrl}/tv/${id}/videos?api_key=${environment.apikey}&include_video_language=it`).pipe(switchMap(res =>{
        return of(res.results.slice(0, 1))}));
  }

  getTvShowsImages(id: string){
    return this.http.get<TvImages>(
      `${environment.baseUrl}/tv/${id}/images?api_key=${environment.apikey}`
    )
  }

  getTvShowsCredits(id: string){
    return this.http.get<TvCredits>(
      `${environment.baseUrl}/tv/${id}/credits?api_key=${environment.apikey}`
    )
  }

}
