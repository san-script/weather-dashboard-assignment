// Import necessary Angular modules and classes
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// Define the Angular service
@Injectable({
	providedIn: "root",
})
export class WeatherService {
	private apiKey = "e1d765c61c1c545c396f3b45caaa2800"; // Replace with your OpenWeatherMap API key

	constructor(private http: HttpClient) {}

	// Method to fetch current weather data for a given city
	getCurrentWeather(city: string): Observable<any> {
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
		return this.http.get(apiUrl);
	}

	// Method to fetch weather forecast data for a given city
	getWeatherForecast(city: string): Observable<any> {
		const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
		return this.http.get(apiUrl);
	}
}
