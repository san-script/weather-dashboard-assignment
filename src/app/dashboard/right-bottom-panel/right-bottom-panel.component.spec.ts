import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightBottomPanelComponent } from './right-bottom-panel.component';
import { SharedService } from '../_service/shared.service';
import { of } from 'rxjs';

describe('RightBottomPanelComponent', () => {
  let component: RightBottomPanelComponent;
  let fixture: ComponentFixture<RightBottomPanelComponent>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightBottomPanelComponent],
      providers: [
        {
          provide: SharedService,
          useValue: {
            weatherDataArray$: of([]), // Provide a sample empty observable
            sharedUnit$: of('C'), // Provide a sample observable with a default value
          },
        },
      ],
    });

    fixture = TestBed.createComponent(RightBottomPanelComponent);
    component = fixture.componentInstance;

    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update receivedWeatherData when sharedService.weatherDataArray$ emits data', () => {
    const mockWeatherData = [{
      "cod": "200",
      "message": 0,
      "cnt": 40,
      "list": [
        {
          "dt": 1694790000,
          "main": {
            "temp": 24.24,
            "feels_like": 24.03,
            "temp_min": 24.24,
            "temp_max": 25.19,
            "pressure": 1013,
            "sea_level": 1013,
            "grnd_level": 1009,
            "humidity": 50,
            "temp_kf": -0.95
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "01d"
            }
          ],
          "clouds": {
            "all": 8
          },
          "wind": {
            "speed": 4.28,
            "deg": 152,
            "gust": 4.68
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2023-09-15 15:00:00"
        },
        {
          "dt": 1694800800,
          "main": {
            "temp": 22.62,
            "feels_like": 22.16,
            "temp_min": 22.05,
            "temp_max": 22.62,
            "pressure": 1012,
            "sea_level": 1012,
            "grnd_level": 1009,
            "humidity": 47,
            "temp_kf": 0.57
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "01d"
            }
          ],
          "clouds": {
            "all": 5
          },
          "wind": {
            "speed": 2.69,
            "deg": 168,
            "gust": 5.12
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2023-09-15 18:00:00"
        },
        {
          "dt": 1694811600,
          "main": {
            "temp": 19.26,
            "feels_like": 18.7,
            "temp_min": 19.26,
            "temp_max": 19.26,
            "pressure": 1012,
            "sea_level": 1012,
            "grnd_level": 1009,
            "humidity": 56,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 9
          },
          "wind": {
            "speed": 1.68,
            "deg": 111,
            "gust": 3.85
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2023-09-15 21:00:00"
        },
        {
          "dt": 1694822400,
          "main": {
            "temp": 18.32,
            "feels_like": 17.96,
            "temp_min": 18.32,
            "temp_max": 18.32,
            "pressure": 1012,
            "sea_level": 1012,
            "grnd_level": 1009,
            "humidity": 67,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 10
          },
          "wind": {
            "speed": 1.47,
            "deg": 56,
            "gust": 1.95
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2023-09-16 00:00:00"
        }
      ],
      "city": {
        "id": 2643743,
        "name": "London",
        "coord": {
          "lat": 51.5085,
          "lon": -0.1257
        },
        "country": "GB",
        "population": 1000000,
        "timezone": 3600,
        "sunrise": 1694756087,
        "sunset": 1694801833
      }
    }]
    sharedServiceSpy.weatherDataArray$ = of(mockWeatherData);

    component.ngOnInit();
    expect(component.receivedWeatherData).toEqual(mockWeatherData);
  });

  it('should update receivedUnit and call toggleTemperatureUnit when sharedService.sharedUnit$ emits data', () => {
    const mockUnit = 'F';
    sharedServiceSpy.sharedUnit$ = of(mockUnit);
    const toggleTemperatureUnitSpy = spyOn(component, 'toggleTemperatureUnit');

    component.ngOnInit();
    expect(component.receivedUnit).toEqual(mockUnit);
    expect(toggleTemperatureUnitSpy).toHaveBeenCalled();
  });

 

  // Add more test cases as needed

  afterEach(() => {
    fixture.detectChanges();
    fixture.destroy();
  });
});
