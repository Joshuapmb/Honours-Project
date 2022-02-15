import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveCBDService {
  private subject = new Subject<any>();

  // Called by disability menu
  sendActiveCBD(){
    this.subject.next("");
  }

  // In constructors for the environment components (e.g. office), they subscribe to this 
  getActiveCBD():Observable<any>{
    return this.subject.asObservable();
  }

}
