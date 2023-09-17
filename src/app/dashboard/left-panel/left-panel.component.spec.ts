import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LeftPanelComponent } from "./left-panel.component";
import { WeatherService } from "../_service/weather.service";
import { DatePipe } from "@angular/common";
import { SharedService } from "../_service/shared.service";
import { AlertService } from "src/app/utility/_service/alert.service";
import { of, throwError } from "rxjs";

describe("LeftPanelComponent", () => {
	let component: LeftPanelComponent;
	let fixture: ComponentFixture<LeftPanelComponent>;
	let weatherService: jasmine.SpyObj<WeatherService>;
	let sharedService: jasmine.SpyObj<SharedService>;
	let alertService: jasmine.SpyObj<AlertService>;

	beforeEach(() => {
		// Create spies for services
		weatherService = jasmine.createSpyObj("WeatherService", [
			"getCurrentWeather",
		]);
		sharedService = jasmine.createSpyObj("SharedService", [
			"updateSharedData",
			"convertToTimezoneOffset",
			"updateDataArray",
			"updateSharedUnit",
		]);
		alertService = jasmine.createSpyObj("AlertService", ["error"]);

		TestBed.configureTestingModule({
			declarations: [LeftPanelComponent],
			providers: [
				{ provide: WeatherService, useValue: weatherService },
				{ provide: DatePipe, useClass: MockDatePipe },
				{ provide: SharedService, useValue: sharedService },
				{ provide: AlertService, useValue: alertService },
			],
		});

		fixture = TestBed.createComponent(LeftPanelComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should load weather data", () => {
		const mockWeatherData = {
			name: "London",
			sys: { country: "UK" },
			main: { temp: 20, feels_like: 18, humidity: 50 },
			wind: { deg: 180 },
			weather: [{ icon: "01d", description: "Clear sky" }],
			dt: 1631932800,
			timezone: 3600,
		};

		// Mock the getCurrentWeather method to return the mock data
		weatherService.getCurrentWeather.and.returnValue(of(mockWeatherData));

		component.city = "London";
		component.loadWeatherData();

		expect(weatherService.getCurrentWeather).toHaveBeenCalledWith("London");
		expect(component.currentWeather).toEqual(mockWeatherData);
		expect(component.temp).toBe(20);
		expect(component.temp_feels_like).toBe(18);
		// Add more expectations for other properties
	});

	

	// Add more test cases as needed
});

// Mock DatePipe for testing purposes
class MockDatePipe {
	transform(date: any): any {
		return "mock-date";
	}
}
