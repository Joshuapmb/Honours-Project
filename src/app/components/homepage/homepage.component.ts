import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class HomepageComponent implements OnInit {

  // Disable navigation arrows on carousel  
  constructor(config: NgbCarouselConfig) { 
    config.showNavigationArrows = false; 
  }

  ngOnInit(): void {
  }



}
