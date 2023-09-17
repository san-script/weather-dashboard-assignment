import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<string | null>(null);

  getAlert(): Observable<string | null> {
    return this.alertSubject.asObservable();
  }

  success(message: string) {
    this.alertSubject.next(message);
  }

  error(message: string) {
    this.alertSubject.next(message);
  }

  clear() {
    this.alertSubject.next(null);
  }
}
