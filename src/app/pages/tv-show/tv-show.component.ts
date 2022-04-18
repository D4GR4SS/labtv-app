import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

import { IMAGE_SIZES } from 'src/app/constants/image-size';
import { Tv, TvCredits, TvImages, TvVideo } from 'src/app/models/tv';
import { TvshowService } from 'src/app/services/tvshow.service';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit, OnDestroy {

  tvShow: Tv | null = null;
  tvVideos: TvVideo[] = [];
  tvImages: TvImages | null = null;
  tvCredits: TvCredits | null = null;

  imagesSizes = IMAGE_SIZES;

  constructor(private route: ActivatedRoute, private tvService: TvshowService) { }

  ngOnInit(): void {
    this.route.params.subscribe( ({id}) =>{
      this.getTvShow(id);
      this.getTvShowVideo(id);
      this.getTvShowImages(id);
      this.getTvShowCredits(id);

    })
  }

  ngOnDestroy(): void {
  }

  getTvShow(id: string){
    this.tvService.getTvShow(id).pipe(first()).subscribe(tvData =>{
      this.tvShow = tvData;
      console.log(this.tvShow)
    })
  }

  getTvShowVideo(id: string){
    this.tvService.getTvShowsVideos(id).subscribe(tvVideoData=>{
      this.tvVideos = tvVideoData;
    })
  }

  getTvShowImages(id: string){
    this.tvService.getTvShowsImages(id).subscribe((tvImagesData =>
      this.tvImages = tvImagesData))
  }

  getTvShowCredits(id: string){
    this.tvService.getTvShowsCredits(id).subscribe(tvCreditsData =>
      this.tvCredits = tvCreditsData)
  }

  

}
