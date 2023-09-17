// Import necessary Angular modules and classes
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

// Define the Angular service
@Injectable({
	providedIn: "root",
})
export class SharedService {
	// Create BehaviorSubject to share data with subscribers
	private sharedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
		null
	);
	sharedData$: Observable<any> = this.sharedDataSubject.asObservable();

	// Create BehaviorSubject to share weather data array with subscribers
	private weatherDataArraySubject: BehaviorSubject<any[]> =
		new BehaviorSubject<any[]>([]);
	weatherDataArray$: Observable<any[]> =
		this.weatherDataArraySubject.asObservable();

	// Create BehaviorSubject to share temperature unit with subscribers
	private sharedUnitSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
		null
	);
	sharedUnit$: Observable<any> = this.sharedUnitSubject.asObservable();

	constructor() {}

	// Method to update the shared data
	updateSharedData(data: any): void {
		this.sharedDataSubject.next(data);
	}

	// Method to update the weather data array
	updateDataArray(dataArray: any[]): void {
		this.weatherDataArraySubject.next(dataArray);
	}

	// Method to update the shared temperature unit
	updateSharedUnit(data: any): void {
		this.sharedUnitSubject.next(data);
	}

	// Function to convert a UTC timestamp to a specific timezone offset
	convertToTimezoneOffset(timestamp: number, timezoneOffset: number): Date {
		const utcTimestamp = timestamp * 1000; // Convert to milliseconds
		const localTime = new Date(utcTimestamp);

		// Adjust the time based on the timezone offset (in milliseconds)
		const adjustedTime = new Date(
			localTime.getTime() + timezoneOffset * 1000
		);

		return adjustedTime;
	}

	// Function to convert a string to title case
	toTitleCase(input: string): string {
		return input
			.toLowerCase()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	}

	// Function to get geolcation of current place
	getCurrentLocation(): Promise<any> {
		return new Promise((resolve, reject) => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(
					(position) => resolve(position.coords),
					(error) => reject(error)
				);
			} else {
				reject("Geolocation is not available in this browser.");
			}
		});
	}
}
