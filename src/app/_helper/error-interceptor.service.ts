// Import required modules and dependencies from Angular and RxJS
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

// Create an Injectable class for the ErrorInterceptor
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // Implement the intercept method as required by the HttpInterceptor interface
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Use RxJS pipe to handle potential errors in the HTTP request/response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors here

        // Log the error message to the console for debugging purposes
        console.error("HTTP Error:", error);

        // Optionally, you can re-throw the error to propagate it to the component
        return throwError(error);
      })
    );
  }
}
