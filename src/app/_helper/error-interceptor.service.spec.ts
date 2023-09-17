import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorInterceptor } from './error-interceptor.service';
import { Observable } from 'rxjs';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  
  it('should handle HTTP error', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTesting: HttpTestingController) => {
      const url = '/api/some-endpoint';
      const errorMessage = 'An error occurred';

      http.get(url).subscribe(
        () => fail('Expected an error, but the request succeeded'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500); // Replace with the expected status code
          expect(error.error).toBe(errorMessage); // Replace with the expected error message
        }
      );

      const req = httpTesting.expectOne(url);

      // Simulate an HTTP error response
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });

      httpTesting.verify();
    }
  ));
});
