import { Component, OnInit } from '@angular/core';
import { Tv } from 'src/app/models/tv';
import { TvshowService } from 'src/app/services/tvshow.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {

  tvShows: Tv [] = [];
  searchValue: string | null = null;

  constructor(private tvService: TvshowService) { }

  ngOnInit(): void {
    this.getPagedTvShows(1);

  }

  getPagedTvShows(page: number, searcKeyword?: string){
    this.tvService.searchTvShow(page, searcKeyword).subscribe(data =>{
      this.tvShows = data;
    })
  }

  paginate(event: any){
    const pageNumber = event.page +1;
    if(this.searchValue){
      this.getPagedTvShows(pageNumber, this.searchValue);
    } else {
      this.getPagedTvShows(pageNumber);
    }
  }


  searchChanged(){
    if(this.searchValue){
      this.getPagedTvShows(1, this.searchValue);
    }
  }




}
