import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import {NgbModal, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { ActiveCBDService } from 'src/app/services/active-cbd.service';
import { ActiveMyopiaService } from 'src/app/services/active-myopia.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-the-living-room-page',
  templateUrl: './the-living-room-page.component.html',
  styleUrls: ['./the-living-room-page.component.css']
})
export class TheLivingRoomPageComponent implements OnInit {

 // Create subscription object 
 cbdSelectionSubscription:Subscription;
 myopiaSelectionSubscription:Subscription;

 constructor(private modalService: NgbModal, config: NgbCarouselConfig, private activeCBDService:ActiveCBDService, private activeMyopiaService:ActiveMyopiaService) {

   // Book carousel - do not show bars at bottom
   config.showNavigationIndicators = false;

   // Subscribe the office to activeCBD service. When the user clicks one of the CBDs in the disability menu, this subscriber will know
   this.cbdSelectionSubscription = this.activeCBDService.getActiveCBD().subscribe(()=>{
     this.setCBDImages();
   })

    // Subscribe the office to activeMyopiaService. When the user clicks one of the myopia in the disability menu, this subscriber will know
    this.myopiaSelectionSubscription = this.activeMyopiaService.getActiveMyopia().subscribe(()=>{
    this.setMyopiaVariables();
    })

  }

 // Create an audio object for office background music
 officeBackgroundMusic = new Audio(); 

 // Create an audio object for stroking the cat
 catPurring = new Audio();

 // Determines whether music is playing or not. Initially false, turns true when office is entered, turns false when office is left
 // Can be toggled true/false when the speakers are toggled within the office
 musicPlaying = false;

 // Determines whtehr the office has been entered and which covers to display
 officeEntered = false;








 // When the page loads: 
 // 1. Load some default music which can be changed by the user
 // 2. Load other sounds 
 ngOnInit(): void {
     this.officeBackgroundMusic.src = "../../../assets/officeAssets/audio/enigmatic.mp3"
     this.officeBackgroundMusic.loop = true;
     this.officeBackgroundMusic.load();

     this.catPurring.src = "../../../assets/livingRoomAssets/audio/catPurring.wav"
     this.catPurring.load();

     // Set the correct images based off of session variables
     this.setCBDImages()
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
   // Switches the covers over office/navbar and pauses music/ringtone
   if(this.officeEntered){
     this.officeEntered = false
     this.officeBackgroundMusic.pause();
     this.musicPlaying = false;
   }
   // If you are outside the office this is called as you enter
   // Switches the covers over office/navbar and starts/resumes music
   else if(!this.officeEntered){
     this.officeEntered = true
   }
 }
 







// When use clicks on the cat to pet it, this triggers
 petCat(){
  this.catPurring.play();
 }










 // CBD code follows

 // Set all of the initial CBD booleans
 normalVisionOn = true;
 protanomalyOn = false;
 protanopiaOn  = false;
 deuteranomalyOn = false;
 deuteranopiaOn = false;
 tritanomalyOn = false;
 tritanopiaOn = false;

 // When change occurs in the activeCBD service (e.g. a CBD is selected in the disabilities menu), this is triggered.
 setCBDImages() {


   // Depending on which button was pressed change the variables for which CBD was selected, this will change the images displayed
    if (sessionStorage.getItem("CBD") === "protanomaly"){
      this.normalVisionOn = false;
      this.protanomalyOn = true;
      this.protanopiaOn  = false;
      this.deuteranomalyOn = false;
      this.deuteranopiaOn = false;
      this.tritanomalyOn = false;
      this.tritanopiaOn = false;
   }

   else if (sessionStorage.getItem("CBD") === "protanopia"){
     this.normalVisionOn = false;
     this.protanomalyOn = false;
     this.protanopiaOn  = true;
     this.deuteranomalyOn = false;
     this.deuteranopiaOn = false;
     this.tritanomalyOn = false;
     this.tritanopiaOn = false;
   }

   else if (sessionStorage.getItem("CBD") === "deuteranomaly"){
     this.normalVisionOn = false;
     this.protanomalyOn = false;
     this.protanopiaOn  = false;
     this.deuteranomalyOn = true;
     this.deuteranopiaOn = false;
     this.tritanomalyOn = false;
     this.tritanopiaOn = false;
   }

   else if (sessionStorage.getItem("CBD") === "deuteranopia"){
     this.normalVisionOn = false;
     this.protanomalyOn = false;
     this.protanopiaOn  = false;
     this.deuteranomalyOn = false;
     this.deuteranopiaOn = true;
     this.tritanomalyOn = false;
     this.tritanopiaOn = false;
   }

   else if (sessionStorage.getItem("CBD") === "tritanomaly"){
     this.normalVisionOn = false;
     this.protanomalyOn = false;
     this.protanopiaOn  = false;
     this.deuteranomalyOn = false;
     this.deuteranopiaOn = false;
     this.tritanomalyOn = true;
     this.tritanopiaOn = false;
   }

   else if (sessionStorage.getItem("CBD") === "tritanopia"){
     this.normalVisionOn = false;
     this.protanomalyOn = false;
     this.protanopiaOn  = false;
     this.deuteranomalyOn = false;
     this.deuteranopiaOn = false;
     this.tritanomalyOn = false;
     this.tritanopiaOn = true;
   }

   // If session varable CBD is not set or something else, set to normal vision
   else {
     this.normalVisionOn = true;
     this.protanomalyOn = false;
     this.protanopiaOn  = false;
     this.deuteranomalyOn = false;
     this.deuteranopiaOn = false;
     this.tritanomalyOn = false;
     this.tritanopiaOn = false;
   }
 }









   // Myopia code follows

  // Set all of the initial Myopia booleans
  noMyopiaOn = true;
  mildMyopiaOn = false;
  significantMyopiaOn  = false;
  severeMyopiaOn = false;

  // Set booleans to turn on/off myopia overlays
  // When change occurs in the active myopia service (e.g. a myopia is selected in the disabilities menu), this is triggered.
  setMyopiaVariables(){
    if (sessionStorage.getItem("myopia") === "mild"){
      this.noMyopiaOn = false;
      this.mildMyopiaOn = true;
      this.significantMyopiaOn  = false;
      this.severeMyopiaOn = false;
    }

    else if (sessionStorage.getItem("myopia") === "significant"){
      this.noMyopiaOn = false;
      this.mildMyopiaOn = false;
      this.significantMyopiaOn  = true;
      this.severeMyopiaOn = false;
    }

    else if (sessionStorage.getItem("myopia") === "severe"){
      this.noMyopiaOn = false;
      this.mildMyopiaOn = false;
      this.significantMyopiaOn  = false;
      this.severeMyopiaOn = true;
    }

    else{
      this.noMyopiaOn = true;
      this.mildMyopiaOn = false;
      this.significantMyopiaOn  = false;
      this.severeMyopiaOn = false;
    }
  }

 
}

