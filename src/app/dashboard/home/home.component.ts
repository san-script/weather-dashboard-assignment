// Import necessary Angular modules and services
import { Component, ChangeDetectorRef } from "@angular/core";
import { SharedService } from "../_service/shared.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
	city = "London"; // Replace with the desired city
	locationValue: string = "";
	sharedLocation: string = "";

	constructor(
		private sharedService: SharedService,
		private cdr: ChangeDetectorRef
	) {}

	// Initialize component
	ngOnInit(): void {
		// Subscribe to shared data updates for the city
		this.sharedService.sharedData$.subscribe((data) => {
			this.sharedLocation = data;
			this.city = this.sharedLocation;
			this.locationValue = this.sharedLocation;
		});

		// Trigger change detection to ensure data is updated in the view
		this.cdr.detectChanges();
	}

	// Function to search for a location
	searchLocation() {
		this.shareLocation();
	}

	// Function to share the selected location
	shareLocation(): void {
		this.sharedService.updateSharedData(this.locationValue);
	}
}
