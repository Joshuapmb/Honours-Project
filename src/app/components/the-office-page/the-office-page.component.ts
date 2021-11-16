import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-the-office-page',
  templateUrl: './the-office-page.component.html',
  styleUrls: ['./the-office-page.component.css']
})
export class TheOfficePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  audioPlaying = false;
  audio = new Audio();
  
  toggleTinnitus(selectedSound: string){
    
    if (selectedSound == "4KhzTWave"){
      this.audio.src = "../../../assets/4 Khz Triangle Wave.wav"
    }
    else if(selectedSound == "test"){
      this.audio.src = "../../../assets/test.wav";
    }

    
    this.audio.load();

    if (this.audioPlaying == false){
      this.audio.play();
      this.audio.loop = true;
      this.audioPlaying = true;
      setTimeout(this.toggleTinnitus, 1500);
    } 
    else{
      this.audio.loop = false;
      this.audio.pause();
      this.audioPlaying = false;
    }


  }



}
