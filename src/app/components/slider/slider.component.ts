import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGE_SIZES } from 'src/app/constants/image-size';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0})),
      transition('void <=> *', [animate('1s')])
    ])
  ]
})
export class SliderComponent implements OnInit {

  @Input() items: Movie[] = [];
  @Input() Banner: boolean = false;

  currentSlideIndex : number = 0;

  readonly imagesSizes = IMAGE_SIZES;




  constructor() { }

  ngOnInit(): void {
    if(!this.Banner){
      setInterval(()=>{
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
        }, 5000)
    
    }
  
  }

}
