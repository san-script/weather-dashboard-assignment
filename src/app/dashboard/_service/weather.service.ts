// Import necessary Angular modules and classes
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

// Define the Angular service
@Injectable({
	providedIn: "root",
})
export class WeatherService {
	private apiKey = environment.WEATHER_API_KEY; // Replace with your OpenWeatherMap API key

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
