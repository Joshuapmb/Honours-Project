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

  // Create an audio object for office background music
  officeBackgroundMusic = new Audio(); 

  // Determines whether music is playing or not. Initially false, turns true when office is entered, turns false when office is left
  // Can be toggled true/false when the speakers are toggled within the office
  musicPlaying = false;

  // Determines whtehr the office has been entered and which covers to display
  officeEntered = false;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  
  // When the page loads, load some default music which can be changed by the user
  ngOnInit(): void {
      this.officeBackgroundMusic.src = "../../../assets/officeAssets/audio/enigmatic.mp3"
      this.officeBackgroundMusic.loop = true;
      this.officeBackgroundMusic.load();
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
      this.musicPlaying = true;
    }
    if(song=="jazzyFrench"){
      this.officeBackgroundMusic.src = "../../../assets/officeAssets/audio/jazzyfrenchy.mp3"
      this.officeBackgroundMusic.load();
      this.officeBackgroundMusic.play();
      this.musicPlaying = true;
    }
    if(song=="happyRock"){
      this.officeBackgroundMusic.src = "../../../assets/officeAssets/audio/happyrock.mp3"
      this.officeBackgroundMusic.load();
      this.officeBackgroundMusic.play();
      this.musicPlaying = true;
    }
  }


 
  // Called when you enter and leave the office via the buttons
  toggleOffice() {
    // If you have been in the office, this is called as you leave
    // Switches the covers over office/navbar and pauses music
    if(this.officeEntered){
      this.officeEntered = false
      this.officeBackgroundMusic.pause();
      this.musicPlaying = false;
    }
    // If you are outside the office this is called as you enter
    // Switches the covers over office/navbar and starts/resumes music
    else if(!this.officeEntered){
      this.officeEntered = true
      this.officeBackgroundMusic.play();
      this.musicPlaying = true;
    }
  }


}
