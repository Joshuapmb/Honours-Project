import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TheOfficePageComponent } from './components/the-office-page/the-office-page.component';
import { TheLivingRoomPageComponent } from './components/the-living-room-page/the-living-room-page.component';
import { LearnMorePageComponent } from './components/learn-more-page/learn-more-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DisabilityMenuComponent } from './components/disability-menu/disability-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    TheOfficePageComponent,
    TheLivingRoomPageComponent,
    LearnMorePageComponent,
    DisabilityMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
