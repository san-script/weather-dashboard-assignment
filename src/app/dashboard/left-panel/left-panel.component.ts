// Import necessary Angular modules and services
import { Component } from "@angular/core";
import { WeatherService } from "../_service/weather.service";
import { DatePipe } from "@angular/common";
import { SharedService } from "../_service/shared.service";
import { AlertService } from "src/app/utility/_service/alert.service"; 
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-left-panel",
	templateUrl: "./left-panel.component.html",
	styleUrls: ["./left-panel.component.scss"],
})
export class LeftPanelComponent {
	// Initialize component properties
	city = "London"; // Replace with the desired city
	currentWeather: any;
	currentDate: any;
	currentTime: string;
	isCelsius: any = true;
	temp: number | undefined;
	tempUnit: string = "C";
	sharedLocation: string = "";
	localTime: Date = new Date();
	errorStat: string = "";
	errorMessage: string = "";
	temp_feels_like: number | undefined;

	constructor(
		// Inject required services
		private weatherService: WeatherService,
		private datePipe: DatePipe,
		private sharedService: SharedService,
		private alertService: AlertService
	) {
		// Initialize current date and time
		this.currentDate = this.datePipe.transform(new Date());
		const now = new Date();
		this.currentTime = now.toLocaleTimeString(); // Get the current time in a formatted string
	}

	ngOnInit(): void {
		// Subscribe to shared data updates for the city
		this.sharedService.updateSharedData(this.city);

		this.sharedService.sharedData$.subscribe((data) => {
			this.sharedLocation = data;
			this.city = this.sharedLocation;
			this.tempUnit='C'
			this.switchToCelsius()
			this.loadWeatherData(); // Load weather data for the selected city
		});


	}

	loadWeatherData() {
		// Load current weather data for the selected city
		this.weatherService
			.getCurrentWeather(this.city)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					// Handle errors gracefully
					this.errorStat = "An error occurred while fetching data.";
					this.errorMessage = error.message; // Clear any previous data
					this.alertService.error(
						"The location you are attempting to find could not be found. Please double-check your spelling and try searching again."
					);
					return throwError(error);
				})
			)
			.subscribe((data) => {
				// Process and update current weather data
				this.currentWeather = data;
				// this.temp = this.currentWeather.main.temp;
				this.temp = this.currentWeather?.main?.temp;

				this.temp_feels_like = this.currentWeather?.main?.feels_like;
				this.localTime = this.sharedService.convertToTimezoneOffset(
					this.currentWeather.dt,
					this.currentWeather.timezone
				);
				this.sharedService.updateDataArray(this.currentWeather);
			});
	}

	switchToCelsius() {
		// Switch temperature unit to Celsius
		if (!this.isCelsius) {
			this.isCelsius = true;
			this.temp = this.currentWeather.main.temp;
			this.temp_feels_like = this.currentWeather.main.feels_like;
			this.tempUnit = "C";

			this.sharedService.updateSharedUnit(this.tempUnit);
		}
	}

	switchToFahrenheit(celsius: number, feels_like: number) {
		// Switch temperature unit to Fahrenheit
		if (this.isCelsius) {
			this.isCelsius = false;
			// Formula to convert Celsius to Fahrenheit: (Celsius * 9/5) + 32
			this.temp = (celsius * 9) / 5 + 32;
			this.temp_feels_like = (feels_like * 9) / 5 + 32;
			this.tempUnit = "F";

			this.sharedService.updateSharedUnit(this.tempUnit);
		}
	}

	// Function to convert a UTC timestamp to a specific timezone offset
	convertToTimezoneOffset(timestamp: number, timezoneOffset: number): any {
		// Adjust the time based on the timezone offset (in milliseconds)
		const adjustedTime = this.sharedService.convertToTimezoneOffset(
			timestamp,
			timezoneOffset
		);
		return adjustedTime;
	}

	toTitleCase(input: string): string {
		// Convert a string to title case
		return this.sharedService.toTitleCase(input);
	}
}
