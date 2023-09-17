import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms"; // Import FormsModule
import { SharedService } from "./dashboard/_service/shared.service";

import { ErrorInterceptor } from "./_helper/error-interceptor.service";
// import { AlertDirective } from './dashboard/alert.directive';
// import { AlertComponent } from './dashboard/alert/alert.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		// AlertDirective,
		// AlertComponent
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		  },
		DatePipe, 
		SharedService],
	bootstrap: [AppComponent],
})
export class AppModule {}
