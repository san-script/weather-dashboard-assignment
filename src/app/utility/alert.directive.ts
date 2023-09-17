// Import necessary Angular modules and classes
import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	Renderer2,
} from "@angular/core";
import { AlertService } from "./_service/alert.service";

// Define the Angular directive
@Directive({
	selector: "[appAlert]",
})
export class AlertDirective {
	@Input() type: "success" | "error" = "success"; // Input property to set the type of alert (success or error)

	constructor(
		private el: ElementRef, // Reference to the DOM element associated with this directive
		private renderer: Renderer2, // Angular renderer for manipulating DOM elements
		private alertService: AlertService // Service for displaying alerts
	) {}

	@HostListener("click") onClick() {
		this.alertService.clear(); // Clear the alert message when the associated element is clicked
	}

	// Angular lifecycle hook: Executes when the directive is initialized
	ngOnInit() {
		this.alertService.getAlert().subscribe((message) => {
			if (message) {
				// Display the alert message
				this.renderer.setStyle(
					this.el.nativeElement,
					"display",
					"block"
				); // Show the element
				this.renderer.addClass(this.el.nativeElement, `${this.type}`); // Add CSS class for styling
				this.el.nativeElement.textContent = message; // Set the message text

				setTimeout(() => {
					// Hide the alert message
					this.renderer.removeStyle(this.el.nativeElement, "display"); // Hide the element
					this.renderer.removeClass(
						this.el.nativeElement,
						`${this.type}`
					); // Remove CSS class
					this.el.nativeElement.textContent = ""; // Clear the message text
				}, 4000);
			} else {
				// Hide the alert message
				this.renderer.removeStyle(this.el.nativeElement, "display"); // Hide the element
				this.renderer.removeClass(
					this.el.nativeElement,
					`${this.type}`
				); // Remove CSS class
				this.el.nativeElement.textContent = ""; // Clear the message text
			}
		});
	}
}
