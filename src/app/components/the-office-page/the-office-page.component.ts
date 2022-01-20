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

  phoneScreen:any
  emailButton:any
  voicemailButton:any
  homeButton:any
  playMessageButton:any
  sendEmailButton:any
  emailRecipientTextarea:any
  emailMessageTextarea:any

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





  // Phone code follows

  goToEmail(){
    // Change screen to email
    this.phoneScreen = document.getElementById("phoneHomeScreen");
    this.phoneScreen.src = "../../../assets/officeAssets/normalVision/phoneEmailScreen.png";

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


  goToVoicemail(){
    this.phoneScreen = document.getElementById("phoneHomeScreen");
    this.phoneScreen.src = "../../../assets/officeAssets/normalVision/phoneVoicemailScreen.png";

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

    // TODO Create an audio here, so when you enter this screen, it says "1 new voicemail"
  }


  goToHome(){
    this.phoneScreen = document.getElementById("phoneHomeScreen");
    this.phoneScreen.src = "../../../assets/officeAssets/normalVision/phoneHomeScreen.png";

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

  playMessage(){
    // TODO An audio needs to be made and the message would be played here when the button is clicked. Audio from goToVoicemail may need to be paused
  }

  sendEmail(){
    // Remove email message text area contents
    this.emailMessageTextarea = document.getElementById("emailMessageTextarea");
    this.emailMessageTextarea.value = "";

    // TODO whoosh noise made
  }


}
