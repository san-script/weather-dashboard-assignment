import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UtilityRoutingModule } from "./utility-routing.module";
import { AlertComponent } from "./alert/alert.component";
import { AlertDirective } from "./alert.directive";
import { AlertService } from "./_service/alert.service";

@NgModule({
	declarations: [AlertComponent, AlertDirective],
	imports: [CommonModule, UtilityRoutingModule],
	exports: [AlertComponent, AlertDirective],
	providers: [AlertService],
})
export class UtilityModule {}
