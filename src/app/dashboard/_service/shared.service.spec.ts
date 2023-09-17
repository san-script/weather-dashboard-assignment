import { TestBed, inject } from '@angular/core/testing';
import { SharedService } from './shared.service';
import { BehaviorSubject } from 'rxjs';

describe('SharedService', () => {
  let sharedService: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService],
    });
    sharedService = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(sharedService).toBeTruthy();
  });

  it('should update and retrieve shared data', () => {
    const testData = 'Test Data';
    sharedService.updateSharedData(testData);
    sharedService.sharedData$.subscribe((data) => {
      expect(data).toBe(testData);
    });
  });

  it('should update and retrieve weather data array', () => {
    const testWeatherDataArray = [{ temperature: 25 }, { temperature: 30 }];
    sharedService.updateDataArray(testWeatherDataArray);
    sharedService.weatherDataArray$.subscribe((dataArray) => {
      expect(dataArray).toEqual(testWeatherDataArray);
    });
  });

  it('should update and retrieve shared temperature unit', () => {
    const testUnit = 'Celsius';
    sharedService.updateSharedUnit(testUnit);
    sharedService.sharedUnit$.subscribe((unit) => {
      expect(unit).toBe(testUnit);
    });
  });

  it('should convert UTC timestamp to timezone offset', () => {
    const utcTimestamp = 1631913600; // Replace with your timestamp
    const timezoneOffset = 3600; // Replace with your desired offset in seconds (e.g., 1 hour)
    const adjustedTime = sharedService.convertToTimezoneOffset(
      utcTimestamp,
      timezoneOffset
    );
    expect(adjustedTime instanceof Date).toBe(true);
  });

  it('should convert string to title case', () => {
    const input = 'hello world';
    const titleCase = sharedService.toTitleCase(input);
    expect(titleCase).toBe('Hello World');
  });
});
