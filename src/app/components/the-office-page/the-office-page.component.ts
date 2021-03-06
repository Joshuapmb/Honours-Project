import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import {NgbModal, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { ActiveCBDService } from 'src/app/services/active-cbd.service';
import { ActiveMyopiaService } from 'src/app/services/active-myopia.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-the-office-page',
  templateUrl: './the-office-page.component.html',
  styleUrls: ['./the-office-page.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class TheOfficePageComponent implements OnInit {

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

  // Create an audio object for sending an email
  emailSound = new Audio();

  // Create an audio object for listening to the voicemail
  voicemailSound = new Audio(); 

  // Create an audio object for listening to the voicemail
  ringtoneSound = new Audio(); 

  // Determines whether music is playing or not. Initially false, turns true when office is entered, turns false when office is left
  // Can be toggled true/false when the speakers are toggled within the office
  musicPlaying = false;

  // Determines whtehr the office has been entered and which covers to display
  officeEntered = false;

  // Determines whether ringtone is playing or not. Initially false, turns true when office is entered, turns false when phone is used
  ringtonePlaying = false;

  // Variables to refer to html components
  phoneScreen:any
  emailButton:any
  voicemailButton:any
  homeButton:any
  playMessageButton:any
  sendEmailButton:any
  emailRecipientTextarea:any
  emailMessageTextarea:any
  









  // When the page loads: 
  // 1. Load some default music which can be changed by the user
  // 2. Load other sounds 
  ngOnInit(): void {
      this.officeBackgroundMusic.src = "../../../assets/officeAssets/audio/enigmatic.mp3"
      this.officeBackgroundMusic.loop = true;
      this.officeBackgroundMusic.load();

      
      this.emailSound.src = "../../../assets/officeAssets/audio/emailSentSound.wav"
      this.emailSound.load();

      this.voicemailSound.src = "../../../assets/officeAssets/audio/voicemail.wav"
      this.voicemailSound.load();

      this.ringtoneSound.src = "../../../assets/officeAssets/audio/ringtone.wav"
      this.ringtoneSound.loop = true;
      this.ringtoneSound.load();

      // Set the correct images based off of session variables
      this.setCBDImages()
  }


  // Open modals when clicking on different items in the office
  openBackDropCustomClass(content: any) {
    this.modalService.open(content);

    // There was an issue after I changed the phone backgrounds from a .src (in this TS file) to *ngIf (in the HTML):
    //  1. Open phone in office, navigate to phone/email app, close phone
    //  2. Reopen phone, buttons are shown for homescreen, but background for phone/email screen is displayed
    // Running this method, resets background and buttons to home screen whenever the phone is opened
    this.goToHome()
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

      this.ringtoneSound.pause();
      this.ringtonePlaying = false

      // Stop voicemail when leaving office. Reload it so it starts from beginning when re-entering office
      this.voicemailSound.pause();
      this.voicemailSound.load();
    }
    // If you are outside the office this is called as you enter
    // Switches the covers over office/navbar and starts/resumes music
    else if(!this.officeEntered){
      this.officeEntered = true

      // Uncomment the below 2 lines if you want the background music to play as soon as you enter the office. This was disabled so that 
      // the ringtone could be heard as soon as you entered, without a sensory overload from music + ringtone
      // this.officeBackgroundMusic.play();
      // this.musicPlaying = true;

      this.ringtoneSound.play();
      this.ringtonePlaying = true
    }
  }










  // Phone code follows

  homeScreenActive = true;
  emailScreenActive = false;
  voicemailScreenActive = false;

  // When user clicks the email app from the home screen
  goToEmail(){
    // Change screen to email
    this.phoneScreen = document.getElementById("phoneHomeScreen");
    
    this.homeScreenActive = false;
    this.emailScreenActive = true;
    this.voicemailScreenActive = false;

    // Remove email button
    this.emailButton = document.getElementById("emailButton");
    this.emailButton.style.display = "none";

    // Remove voicemail button
    this.voicemailButton = document.getElementById("voicemailButton");
    this.voicemailButton.style.display = "none";

    // Display home button
    this.homeButton = document.getElementById("homeButton");
    this.homeButton.style.display = "block";

    // Display send email button
    this.sendEmailButton = document.getElementById("sendEmailButton");
    this.sendEmailButton.style.display = "block";

    // Display email recipient text area 
    this.emailRecipientTextarea = document.getElementById("emailRecipientTextarea");
    this.emailRecipientTextarea.style.display = "block";

    // Display email message text area 
    this.emailMessageTextarea = document.getElementById("emailMessageTextarea");
    this.emailMessageTextarea.style.display = "block";
  }


  // When the user opens the voicemail app from the homescreen
  goToVoicemail(){
    this.phoneScreen = document.getElementById("phoneHomeScreen");

    // If the user hasn't entered the phone app before, then the ringtone will be playing. So when they click on the phone app to 
    // interact with it, stop playing the ringtone
    if(this.ringtonePlaying){
      this.ringtoneSound.pause();
      this.ringtonePlaying = false
    }

    this.homeScreenActive = false;
    this.emailScreenActive = false;
    this.voicemailScreenActive = true;

    // Remove email button
    this.emailButton = document.getElementById("emailButton");
    this.emailButton.style.display = "none";

    // Remove voicemail button
    this.voicemailButton = document.getElementById("voicemailButton");
    this.voicemailButton.style.display = "none";

    // Display home button
    this.homeButton = document.getElementById("homeButton");
    this.homeButton.style.display = "block";

    // Display play message button
    this.playMessageButton = document.getElementById("playMessageButton");
    this.playMessageButton.style.display = "block";
  }


  // When the user closes the app by pressing the 'close(X)' button
  goToHome(){
    this.phoneScreen = document.getElementById("phoneHomeScreen");
      
    this.homeScreenActive = true;
    this.emailScreenActive = false;
    this.voicemailScreenActive = false;

    // Display email button
    this.emailButton = document.getElementById("emailButton");
    this.emailButton.style.display = "block";

    // Disaply voicemail button
    this.voicemailButton = document.getElementById("voicemailButton");
    this.voicemailButton.style.display = "block";

    // Remove home button
    this.homeButton = document.getElementById("homeButton");
    this.homeButton.style.display = "none";

    // Remove play message button
    this.playMessageButton = document.getElementById("playMessageButton");
    this.playMessageButton.style.display = "none";

    // Remove send email button
    this.sendEmailButton = document.getElementById("sendEmailButton");
    this.sendEmailButton.style.display = "none";

    // Remove email recipient text area 
    this.emailRecipientTextarea = document.getElementById("emailRecipientTextarea");
    this.emailRecipientTextarea.style.display = "none";

    // Remove email message text area 
    this.emailMessageTextarea = document.getElementById("emailMessageTextarea");
    this.emailMessageTextarea.style.display = "none";
  }


  // Plays voicemail when the user clicks '1' in the voicemail app
  playMessage(){
    this.voicemailSound.play()
  }


  // When the user presses 'send' on the email app, this happens:
  sendEmail(){
    // Remove email message text area contents
    this.emailMessageTextarea = document.getElementById("emailMessageTextarea");
    this.emailMessageTextarea.value = "";

    // Play sound effect to notify that email is sent
    this.emailSound.play();
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
