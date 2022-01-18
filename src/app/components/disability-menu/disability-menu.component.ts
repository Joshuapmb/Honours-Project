import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disability-menu',
  templateUrl: './disability-menu.component.html',
  styleUrls: ['./disability-menu.component.css']
})
export class DisabilityMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // if (sessionStorage.getItem("tinnitusPlaying") === "true"){
    //   this.arrayOfTinnitusButtons = document.getElementsByClassName("tinnitusButton")
    //   for (var i = 0 ; i<this.arrayOfTinnitusButtons.length; i++){
    //     this.arrayOfTinnitusButtons[i].disabled = true 
    //   }
    //   this.activeTinnitusButton = sessionStorage.getItem("activeTinnitusButton")
    //   this.activeTinnitusButton.disabled = false

    // }

  }

  audioPlaying = false;
  audio = new Audio();
  activeTinnitusButton : any;
  arrayOfTinnitusButtons : any;


  toggleTinnitus(selectedSound: string){
    if (selectedSound == "4KhzTWave"){
      this.audio.src = "../../../assets/tinnitusSounds/4 Khz Triangle Wave.wav"
      this.activeTinnitusButton = document.getElementById("tinnitus4KhzTWave")
    }
    else if(selectedSound == "5KhzIWave"){
      this.audio.src = "../../../assets/tinnitusSounds/5 Khz Impulse Wave.wav";
      this.activeTinnitusButton = document.getElementById("tinnitus5KhzIWave")
    }
    else if(selectedSound == "5KhzSWave"){
      this.audio.src = "../../../assets/tinnitusSounds/5 Khz Square Wave.wav";
      this.activeTinnitusButton = document.getElementById("tinnitus5KhzSWave")
    }
    else if(selectedSound == "8KhzTWave"){
      this.audio.src = "../../../assets/tinnitusSounds/8 Khz Triangle Wave.wav";
      this.activeTinnitusButton = document.getElementById("tinnitus8KhzTWave")
    }
    else if(selectedSound == "10KhzSinWave"){
      this.audio.src = "../../../assets/tinnitusSounds/10 Khz Sine Wave.wav";
      this.activeTinnitusButton = document.getElementById("tinnitus10KhzSinWave")
    }
    else if(selectedSound == "13KhzSWave"){
      this.audio.src = "../../../assets/tinnitusSounds/13 Khz Square Wave.wav";
      this.activeTinnitusButton = document.getElementById("tinnitus13KhzSWave")
    }
    else if(selectedSound == "14KhzSinWave"){
      this.audio.src = "../../../assets/tinnitusSounds/14 Khz Sine Wave.wav";
      this.activeTinnitusButton = document.getElementById("tinnitus14KhzSinWave")
    }
    else if(selectedSound == "200hzIWave"){
      this.audio.src = "../../../assets/tinnitusSounds/200 Hz Impulse Wave.wav";
      this.activeTinnitusButton = document.getElementById("tinnitus200hzIWave")
    }
    else if(selectedSound == "BrownNoise"){
      this.audio.src = "../../../assets/tinnitusSounds/Brown Noise.wav";
      this.activeTinnitusButton = document.getElementById("tinnitusBrownNoise")
    }
    else if(selectedSound == "VioletNoise"){
      this.audio.src = "../../../assets/tinnitusSounds/Violet Noise.wav";
      this.activeTinnitusButton = document.getElementById("tinnitusVioletNoise")
    }
    else if(selectedSound == "test"){
      this.audio.src = "../../../assets/tinnitusSounds/test.wav";
      this.activeTinnitusButton = document.getElementById("test")
    }

    this.arrayOfTinnitusButtons = document.getElementsByClassName("tinnitusButton")
    this.audio.load();

    // When the audio is inactive
    if (this.audioPlaying == false){
    // if (sessionStorage.getItem("tinnitusPlaying") === "false"){
      // Start playing it in a loop
      this.audio.play();
      this.audio.loop = true;
      this.audioPlaying = true;
      // sessionStorage.setItem("tinnitusPlaying", "true");
      // sessionStorage.setItem("activeTinnitusButton", this.activeTinnitusButton);

      // Disable the other buttons by disabling all then re-enabling the active 
      for (var i = 0 ; i<this.arrayOfTinnitusButtons.length; i++){
        this.arrayOfTinnitusButtons[i].disabled = true 
      }
      this.activeTinnitusButton.disabled = false
    } 


    // When the audio is already playing
    else{
      // Turn it off
      this.audio.loop = false;
      this.audio.pause();
      this.audioPlaying = false;
      // sessionStorage.setItem("tinnitusPlaying", "false");

      // Re-enable the other buttons
      for (var i = 0 ; i<this.arrayOfTinnitusButtons.length; i++){
      this.arrayOfTinnitusButtons[i].disabled = false 
      }
    }

  }


}
