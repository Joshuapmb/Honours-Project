import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
showDropdown() {
  var dropdown = document.getElementById("myDropdown");
  if(dropdown){
    dropdown.classList.toggle("show");
  }
}

}
