// Import necessary Angular modules and services
import { Component } from "@angular/core";
import { SharedService } from "../_service/shared.service";

@Component({
	selector: "app-right-bottom-panel",
	templateUrl: "./right-bottom-panel.component.html",
	styleUrls: ["./right-bottom-panel.component.scss"],
})
export class RightBottomPanelComponent {
	receivedWeatherData: any = []; // Store received weather data
	receivedUnit: string = "C"; // Store temperature unit (default: Celsius)
	temperatureMin: number = 0; // Store minimum temperature
	temperatureMax: number = 0; // Store maximum temperature

	constructor(private sharedService: SharedService) {}

	ngOnInit(): void {
		// Subscribe to weather data updates from the shared service
		this.sharedService.weatherDataArray$.subscribe((data) => {
			this.receivedWeatherData = data;
			this.toggleTemperatureUnit(); // Update temperature unit and values
		});

		// Subscribe to temperature unit updates from the shared service
		this.sharedService.sharedUnit$.subscribe((data) => {
			this.receivedUnit = data;
			this.toggleTemperatureUnit(); // Update temperature unit and values
		});
	}

	// Function to toggle between Celsius and Fahrenheit temperature units
	toggleTemperatureUnit(): void {
		if (this.receivedWeatherData && this.receivedWeatherData.main) {
			if (this.receivedUnit === "F") {
				// Convert from Celsius to Fahrenheit
				this.temperatureMin =
					(this.receivedWeatherData.main.temp_min * 9) / 5 + 32;
				this.temperatureMax =
					(this.receivedWeatherData.main.temp_max * 9) / 5 + 32;
				this.receivedUnit = "F"; // Set temperature unit to Fahrenheit
			} else {
				// Convert from Fahrenheit to Celsius
				this.temperatureMin = this.receivedWeatherData.main.temp_min;
				this.temperatureMax = this.receivedWeatherData.main.temp_max;
				this.receivedUnit = "C"; // Set temperature unit to Celsius
			}
		}
	}
}
