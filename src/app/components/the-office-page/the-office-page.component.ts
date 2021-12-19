import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import {NgbModal, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-the-office-page',
  templateUrl: './the-office-page.component.html',
  styleUrls: ['./the-office-page.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class TheOfficePageComponent implements OnInit {

  constructor(private modalService: NgbModal, config: NgbCarouselConfig) {
    config.showNavigationIndicators = false;
   }

  ngOnInit(): void {
    
  }

  openBackDropCustomClass(content: any) {
    this.modalService.open(content);
  }

  
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

}
