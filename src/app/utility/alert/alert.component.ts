import { Component } from '@angular/core';
import { AlertService } from '../_service/alert.service'; 

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(private alertService: AlertService) {}

  close() {
    this.alertService.clear();
  }
}
