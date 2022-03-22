import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import {NgbModal, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { ActiveCBDService } from 'src/app/services/active-cbd.service';
import { ActiveMyopiaService } from 'src/app/services/active-myopia.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-the-driving-page',
  templateUrl: './the-driving-page.component.html',
  styleUrls: ['./the-driving-page.component.css']
})
export class TheDrivingPageComponent implements OnInit {

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

 // Create an audio object for driving background music
 drivingBackgroundMusic = new Audio(); 
 
 // Create an audio object for driving background car driving sounds
 drivingBackgroundSound = new Audio(); 
 
 // Create an audio object for when you are indicating
 indicatorSound = new Audio(); 

 // Create an audio object for when car crashes
 carCrash = new Audio(); 

 // Determines whether music is playing or not. Initially false, turns true when office is entered, turns false when office is left
 // Can be toggled true/false when the speakers are toggled within the office
 musicPlaying = false;

 // Determines whtehr the office has been entered and which covers to display
 drivingEntered = false;








 // When the page loads: 
 // 1. Load some default music which can be changed by the user
 // 2. Load other sounds 
 ngOnInit(): void {
     this.drivingBackgroundMusic.src = "../../../assets/officeAssets/audio/enigmatic.mp3"
     this.drivingBackgroundMusic.loop = true;
     this.drivingBackgroundMusic.load();

     this.drivingBackgroundSound.src = "../../../assets/drivingAssets/audio/carDriveSound.wav"
     this.drivingBackgroundSound.loop = true;
     this.drivingBackgroundSound.load();

     this.carCrash.src = "../../../assets/drivingAssets/audio/carCrashSound.wav";
     this.carCrash.load();

     this.indicatorSound.src = "../../../assets/drivingAssets/audio/indicatorSound.wav";
     this.indicatorSound.load();


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
     this.drivingBackgroundMusic.pause();
     this.musicPlaying = false;
   }
   else{
     this.drivingBackgroundMusic.play();
     this.musicPlaying = true;
   }
 }

 // When screen 2 is selected and the user changes the Song by pressing the buttons on the modal, this method is called
 changeSong(song: string){
   if(song=="enigmatic"){
     this.drivingBackgroundMusic.src = "../../../assets/officeAssets/audio/enigmatic.mp3"
     this.drivingBackgroundMusic.load();
     this.drivingBackgroundMusic.play();
     this.musicPlaying = true;
   }
   if(song=="jazzyFrench"){
     this.drivingBackgroundMusic.src = "../../../assets/officeAssets/audio/jazzyfrenchy.mp3"
     this.drivingBackgroundMusic.load();
     this.drivingBackgroundMusic.play();
     this.musicPlaying = true;
   }
   if(song=="happyRock"){
     this.drivingBackgroundMusic.src = "../../../assets/officeAssets/audio/happyrock.mp3"
     this.drivingBackgroundMusic.load();
     this.drivingBackgroundMusic.play();
     this.musicPlaying = true;
   }
 }










 // Called when you enter and leave the office via the buttons
 toggleDriving() {
   // If you have been in the office, this is called as you leave
   // Switches the covers over office/navbar and pauses music/ringtone
   if(this.drivingEntered){
     this.drivingEntered = false
     this.drivingBackgroundMusic.pause();
     this.drivingBackgroundSound.pause();
     this.musicPlaying = false;
   }
   // If you are outside the office this is called as you enter
   // Switches the covers over office/navbar and starts/resumes music
   else if(!this.drivingEntered){
     this.drivingEntered = true

     // If the user crashes the car and leaves the driving env. to then re-enter it, do not play driving music. It will play when they press 'reset'
     if(!this.canCrash){
      this.drivingBackgroundSound.play();
     }
   }
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









  // Driving background code follows
  
  // Set all of the initial background image booleans
  dBG1Active = true;
  dBG2Active = false;
  dBG3Active = false;
  dBG4Active = false;
  dBG5Active = false;
  dBG6Active = false;
  dBG7Active = false;
  dBG8Active = false;
  dBG9Active = false;
  dBG10Active = false;
  dBG11Active = false;

  //  Set booleans for obstacles
  redLight = false;
  canHitPedestrians = false;
  canHitWhiteCar = false;

  needsToIndicate = false;

  drive(activeBG: any){

    // Before proceeding to the new area, check if the player can crash (true if they haven't cleared obstacles)
    this.canWeCrash()

    if(activeBG == "2"){
      this.dBG1Active = false;
      this.dBG2Active = true;
      this.dBG3Active = false;
      this.dBG4Active = false;
      this.dBG5Active = false;
      this.dBG6Active = false;
      this.dBG7Active = false;
      this.dBG8Active = false;
      this.dBG9Active = false;
      this.dBG10Active = false;
      this.dBG11Active = false;

      this.needsToIndicate = true;
    }

    else if(activeBG == "3"){
      this.dBG1Active = false;
      this.dBG2Active = false;
      this.dBG3Active = true;
      this.dBG4Active = false;
      this.dBG5Active = false;
      this.dBG6Active = false;
      this.dBG7Active = false;
      this.dBG8Active = false;
      this.dBG9Active = false;
      this.dBG10Active = false;
      this.dBG11Active = false;
    }

    else if(activeBG == "4"){
      this.dBG1Active = false;
      this.dBG2Active = false;
      this.dBG3Active = false;
      this.dBG4Active = true;
      this.dBG5Active = false;
      this.dBG6Active = false;
      this.dBG7Active = false;
      this.dBG8Active = false;
      this.dBG9Active = false;
      this.dBG10Active = false;
      this.dBG11Active = false;

      this.canHitWhiteCar = true;
      this.needsToIndicate = true;
    }

    else if(activeBG == "5"){
      this.dBG1Active = false;
      this.dBG2Active = false;
      this.dBG3Active = false;
      this.dBG4Active = false;
      this.dBG5Active = true;
      this.dBG6Active = false;
      this.dBG7Active = false;
      this.dBG8Active = false;
      this.dBG9Active = false;
      this.dBG10Active = false;
      this.dBG11Active = false;
    }        

    else if(activeBG == "6"){
      this.dBG1Active = false;
      this.dBG2Active = false;
      this.dBG3Active = false;
      this.dBG4Active = false;
      this.dBG5Active = false;
      this.dBG6Active = true;
      this.dBG7Active = false;
      this.dBG8Active = false;
      this.dBG9Active = false;
      this.dBG10Active = false;
      this.dBG11Active = false;
    }

    else if(activeBG == "7"){
      this.dBG1Active = false;
      this.dBG2Active = false;
      this.dBG3Active = false;
      this.dBG4Active = false;
      this.dBG5Active = false;
      this.dBG6Active = false;
      this.dBG7Active = true;
      this.dBG8Active = false;
      this.dBG9Active = false;
      this.dBG10Active = false;
      this.dBG11Active = false;

      this.redLight = true;
      this.canHitPedestrians = true;
    }

    else if(activeBG == "8"){
      this.dBG1Active = false;
      this.dBG2Active = false;
      this.dBG3Active = false;
      this.dBG4Active = false;
      this.dBG5Active = false;
      this.dBG6Active = false;
      this.dBG7Active = false;
      this.dBG8Active = true;
      this.dBG9Active = false;
      this.dBG10Active = false;
      this.dBG11Active = false;
      
      this.needsToIndicate = true;
    }  
    else if(activeBG == "9"){
      this.dBG1Active = false;
      this.dBG2Active = false;
      this.dBG3Active = false;
      this.dBG4Active = false;
      this.dBG5Active = false;
      this.dBG6Active = false;
      this.dBG7Active = false;
      this.dBG8Active = false;
      this.dBG9Active = true;
      this.dBG10Active = false;
      this.dBG11Active = false;
    }

    else if(activeBG == "10"){
      this.dBG1Active = false;
      this.dBG2Active = false;
      this.dBG3Active = false;
      this.dBG4Active = false;
      this.dBG5Active = false;
      this.dBG6Active = false;
      this.dBG7Active = false;
      this.dBG8Active = false;
      this.dBG9Active = false;
      this.dBG10Active = true;
      this.dBG11Active = false;
      
      this.needsToIndicate = true;
    }

    else if(activeBG == "11"){
      this.dBG1Active = false;
      this.dBG2Active = false;
      this.dBG3Active = false;
      this.dBG4Active = false;
      this.dBG5Active = false;
      this.dBG6Active = false;
      this.dBG7Active = false;
      this.dBG8Active = false;
      this.dBG9Active = false;
      this.dBG10Active = false;
      this.dBG11Active = true;
    }    
    
    else{
      this.dBG1Active = true;
      this.dBG2Active = false;
      this.dBG3Active = false;
      this.dBG4Active = false;
      this.dBG5Active = false;
      this.dBG6Active = false;
      this.dBG7Active = false;
      this.dBG8Active = false;
      this.dBG9Active = false;
      this.dBG10Active = false;
      this.dBG11Active = false;
    }    
  }










  // Below are the methods for removing obstacles and crashing the car 

  // Runs when obstacle is clicked to clear it
  clearTrafficLights(){
    var trafficLightComponent = document.getElementById("trafficLights")
    if(trafficLightComponent){
      trafficLightComponent.style.outlineColor = "lime"
      this.redLight = false;
    }
  }


  // Runs when obstacle is clicked to clear it
  clearPedestrians(){
    var pedestriansComponent = document.getElementById("pedestrians")
    if(pedestriansComponent){
      pedestriansComponent.style.outlineColor = "lime"
      this.canHitPedestrians = false;
    }
  }


  // Runs when obstacle is clicked to clear it
  clearWhiteCar(){
    var whiteCarComponent = document.getElementById("whiteCar")
    if(whiteCarComponent){
      whiteCarComponent.style.outlineColor = "lime"
      this.canHitWhiteCar = false;
    }
  }


  // Runs when obstacle is clicked to clear it
  indicate(){
    var indicatorComponent = document.getElementById("indicator")
    if(indicatorComponent){
      indicatorComponent.style.outlineColor = "lime"
      this.needsToIndicate = false;
     this.indicatorSound.play();
    }
  }
  
    

  // If this is true and the user clicks to drive to the next area, they will crash 
  canCrash = false;

  // Before proceeding to the next area, this is called to check if the user can crash, if they can crash and drive on, a bool is set and a different picture will therefore be displayed of the crash
  canWeCrash(){
    // If car crashed
    if(this.redLight || this.canHitPedestrians || this.canHitWhiteCar || this.needsToIndicate ){
      this.canCrash = true;
      
      this.drivingBackgroundSound.pause();
      this.carCrash.play();
    }
    else{
      this.canCrash = false;
    }
  }


  // Reset the car's starting position and variables. Runs when user crashes and presses reset button
  resetCar(){
    this.redLight = false;
    this.canHitPedestrians = false;
    this.canHitWhiteCar = false;
    this.needsToIndicate = false;
    this.canCrash = false;
    
    this.drivingBackgroundSound.play();
    this.drive("1")
  }



}
