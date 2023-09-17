import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve current weather data', () => {
    const mockCity = 'London';
    const mockResponse = { /* Your mock response data here */ };

    service.getCurrentWeather(mockCity).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/weather?q=${mockCity}&appid=${service['apiKey']}&units=metric`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve weather forecast data', () => {
    const mockCity = 'London';
    const mockResponse = { /* Your mock response data here */ };

    service.getWeatherForecast(mockCity).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/forecast?q=${mockCity}&appid=${service['apiKey']}&units=metric`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
