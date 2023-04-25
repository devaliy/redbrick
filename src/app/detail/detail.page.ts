import { Component, ElementRef, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    goNext(){
    //  this.swiper?.slideNext();
    }
    goPrevious(){
      //this.swiper?.slidePrev();
    }

}
