import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { IMAGE_SIZES } from '../../constants/image-size';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  
  @Input() itemData: Movie | null = null;

  imagesSizes = IMAGE_SIZES;

  constructor() { }

  ngOnInit(): void {
  }

}
