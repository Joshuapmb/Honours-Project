import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import different page components for routing
import { HomepageComponent } from './components/homepage/homepage.component';
import { LearnMorePageComponent } from './components/learn-more-page/learn-more-page.component';
import { TheLivingRoomPageComponent } from './components/the-living-room-page/the-living-room-page.component';
import { TheOfficePageComponent } from './components/the-office-page/the-office-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'learnMore', component: LearnMorePageComponent },
  { path: 'theLivingRoom', component: TheLivingRoomPageComponent },
  { path: 'theOffice', component: TheOfficePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
