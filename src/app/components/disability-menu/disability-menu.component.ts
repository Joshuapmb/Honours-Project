import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disability-menu',
  templateUrl: './disability-menu.component.html',
  styleUrls: ['./disability-menu.component.css']
})
export class DisabilityMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Loop the Tinnitus audio
    this.audio.loop = true;
  }

  audio = new Audio();
  activeTinnitusButton : any;
  arrayOfTinnitusButtons : any;


  // When one of the Tinnitus buttons is clicked: 
  toggleTinnitus(selectedSound: string){
    // The correct audio is selected, based on which button was pressed
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

    // Get array of all tinnitus buttons to disable/enable them
    this.arrayOfTinnitusButtons = document.getElementsByClassName("tinnitusButton")

    // Load selected audio
    this.audio.load();

    // When the audio is inactive:
    if (sessionStorage.getItem("tinnitusPlaying") === "false"){
      // Start playing it in a loop
      this.audio.play();
      sessionStorage.setItem("tinnitusPlaying", "true");
      sessionStorage.setItem("activeTinnitusButton", this.activeTinnitusButton.id);

      // Disable the other buttons by disabling all then re-enabling the active 
      for (var i = 0 ; i<this.arrayOfTinnitusButtons.length; i++){
        this.arrayOfTinnitusButtons[i].disabled = true 
      }
      this.activeTinnitusButton.disabled = false
    } 


    // When the audio is already playing
    else{
      // Turn it off
      this.audio.pause();
      sessionStorage.setItem("tinnitusPlaying", "false");

      // Re-enable the other buttons
      for (var i = 0 ; i<this.arrayOfTinnitusButtons.length; i++){
      this.arrayOfTinnitusButtons[i].disabled = false 
      }
    }

  }


}
