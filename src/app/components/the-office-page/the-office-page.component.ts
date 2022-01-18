import { SourceMapGenerator } from '@angular/compiler/src/output/source_map';
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

   
  officeBackgroundMusic = new Audio(); 
  musicPlaying = true;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);




  // IMPORTANT ISSUE: WHEN YOUR GO FROM OFFICE TO ANOTHER PAGE THE SOUND STILL PLAYS. WHEN YOU GO BACK TO THE OFFICE ANOTHER INSTANCE OF THE 
  // DEFAULT MUSIC PLAYS. 
  
  //TO PREVENT THIS I COULD HAVE SESSION/LOCAL STORAGE VARIABLES CALLED OFFICEMUSICPLAYING. THIS WOULD BE TRUE WHEN THE OFFICE
  // HAD BEEN ENTERED AND THE DEFAULT MUSIC STARTED PLAYING. THEN IN THE NAVBAR HAVE CLICK FUNCTIONS SO WHEN YOU CLICK TO NAVIGATE AROUND THE
  // SITE, IT CHECKS FOR THOSE SESSION/LOCAL VARIABLES AND IF THEY ARE TRUE, IT WILL PAUSE THE MUSIC AND SET THE VARIABLE TO FALSE. WHEN THE
  // OFFICE IS ENTERED AGAIN, THE DEFAULT MUSIC WOULD PLAY AND VARIABLE SET TO TRUE AGAIN. ISSUE BECAUSE THE NAVBAR HAS TO THEN ACCESS THE
  // AUDIO OBJECTS IN SPECIFIC PAGES :(

  // OR HAVE A BUTTON TO ENTER AND LEAVE THE ROOMS. WHEN YOU ENTER, THE SOUND PLAYS, THEN WHEN YOU PRESS LEAVE IT STOPS
  // COULD HAVE FADE TRANSITIONS AND TRANSPARENT COVER OVER THE ROOMS

  // SIMILAR ISSUE WITH TINNITUS NOISES, BUT PERHAPS JUST NEED GLOBAL/LOCAL/SESSION VARIABLES TO DEAL WITH THAT
  
  // When the page loads, play some default music which can be changed by the user
  ngOnInit(): void {
      this.officeBackgroundMusic.src = "../../../assets/officeAssets/audio/enigmatic.mp3"
      this.officeBackgroundMusic.loop = true;
      this.officeBackgroundMusic.load();
      this.officeBackgroundMusic.play();
  }


  // Open modals when clicking on different items in the office
  openBackDropCustomClass(content: any) {
    this.modalService.open(content);
  }


  // When the speakers are clicked, turn the music on or off
  toggleMusic(){
    if (this.musicPlaying == true){
      this.officeBackgroundMusic.pause();
      this.musicPlaying = false;
    }
    else{
      this.officeBackgroundMusic.play();
      this.musicPlaying = true;
    }
  }

  // When screen 2 is selected and the user changes the Song by pressing the buttons on the modal, this method is called
  changeSong(song: string){
    if(song=="enigmatic"){
      this.officeBackgroundMusic.src = "../../../assets/officeAssets/audio/enigmatic.mp3"
      this.officeBackgroundMusic.load();
      this.officeBackgroundMusic.play();
    }
    if(song=="jazzyFrench"){
      this.officeBackgroundMusic.src = "../../../assets/officeAssets/audio/jazzyfrenchy.mp3"
      this.officeBackgroundMusic.load();
      this.officeBackgroundMusic.play();
    }
    if(song=="happyRock"){
      this.officeBackgroundMusic.src = "../../../assets/officeAssets/audio/happyrock.mp3"
      this.officeBackgroundMusic.load();
      this.officeBackgroundMusic.play();
    }

  }


}
