import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveMyopiaService {
  private subject = new Subject<any>();

  // Called by disability menu
  sendActiveMyopia(){
    this.subject.next("");
  }

  // In constructors for the environment components (e.g. office), they subscribe to this 
  getActiveMyopia():Observable<any>{
    return this.subject.asObservable();
  }

}
