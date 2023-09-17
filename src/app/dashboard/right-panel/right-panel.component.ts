// Import necessary Angular and amCharts modules and services
import { Component } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { WeatherService } from "../_service/weather.service";
import { DatePipe } from "@angular/common";
import { SharedService } from "../_service/shared.service";
import { AlertService } from "src/app/utility/_service/alert.service";

// Define the Angular component
@Component({
	selector: "app-right-panel",
	templateUrl: "./right-panel.component.html",
	styleUrls: ["./right-panel.component.scss"],
})
export class RightPanelComponent {
	chart: am4charts.XYChart | undefined; // Initialize amCharts chart variable
	city = "London"; // Replace with the desired default city
	locationValue: string = ""; // Store user's selected location
	sharedLocation: string = ""; // Store shared location data

	weatherForecast: any[] = []; // Store weather forecast data

	showTemperatureChart: boolean = true; // Toggle temperature chart visibility
	showHumidityChart: boolean = false; // Toggle humidity chart visibility
	errorStat: string = ""; // Store error status message
	errorMessage: string = ""; // Store error message
	receivedUnit: string = "C"; // Store received temperature unit (Celsius or Fahrenheit)

	constructor(
		private weatherService: WeatherService,
		private datePipe: DatePipe,
		private sharedService: SharedService,
		private alertService: AlertService
	) {}

	// Angular lifecycle hook: Executes when the component is initialized
	ngOnInit() {
		// Subscribe to shared location data changes
		this.sharedService.sharedData$.subscribe((data) => {
			this.sharedLocation = data;
			this.city = this.sharedLocation;
			this.locationValue = this.sharedLocation;
			this.loadTemperaturechart();
		});

		// Subscribe to shared temperature unit changes
		this.sharedService.sharedUnit$.subscribe((data) => {
			this.receivedUnit = data;
			this.toggleTemperatureUnit();
		});

		this.sharedService.getCurrentLocation().then(
			(location) => (
				console.log('location',location)),
			(error) => console.error(error)
		  );
	}

	// Toggle between Celsius and Fahrenheit temperature units
	toggleTemperatureUnit(): void {
		if (this.receivedUnit === "F") {
			this.receivedUnit = "F";
			// Convert from Celsius to Fahrenheit
			this.weatherForecast = this.weatherForecast.map((item) => ({
				...item,
				temperature: (item.main.temp * 9) / 5 + 32, // Modify the temperature
				receivedUnit: this.receivedUnit,
			}));
			this.initTempChart();
		} else {
			this.receivedUnit = "C";
			this.weatherForecast = this.weatherForecast.map((item) => ({
				...item,
				temperature: item.main.temp, // Modify the temperature
				receivedUnit: this.receivedUnit,
			}));
			this.initTempChart();
		}
	}

	// Toggle the temperature chart's visibility
	toggleTemperatureChart() {
		this.showTemperatureChart = true;
		this.showHumidityChart = false;
		this.initTempChart();
	}

	// Toggle the humidity chart's visibility
	toggleHumidityChart() {
		this.showTemperatureChart = false;
		this.showHumidityChart = true;
		this.initHumidityChart();
	}

	// Load the temperature chart with weather data
	loadTemperaturechart() {
		this.weatherService.getWeatherForecast(this.city).subscribe(
			(data) => {
				// Process forecast data to extract the next 5 days
				this.weatherForecast = data.list;
				this.weatherForecast = this.weatherForecast.map((item) => ({
					...item,
					date: this.sharedService.convertToTimezoneOffset(
						item.dt,
						data.city.timezone
					), // Modify the date
					temperature: item.main.temp, // Modify the temperature
					humidity: item.main.humidity, // Modify the humidity
					description: this.sharedService.toTitleCase(
						item.weather[0].description
					), // Modify the description
					receivedUnit: this.receivedUnit,
					icon: item.weather[0].icon,
					pop: item.pop ? item.pop * 100 : 0 
				}));

				if (this.showTemperatureChart) {
					this.initTempChart();
				} else {
					this.initHumidityChart();
				}
			},
			(error) => {
				this.errorStat = "An error occurred while fetching data.";
				this.errorMessage = error.message; // Clear any previous data
				this.alertService.error(
					"The location you are attempting to find could not be found. Please double-check your spelling and try searching again."
				);
			}
		);
	}

	// Initialize the humidity chart using amCharts
	initHumidityChart() {
		if (this.chart) {
			this.chart.dispose();
		}
		am4core.useTheme(am4themes_animated);

		// Create a chart instance
		const chart = am4core.create("chartdiv", am4charts.XYChart);

		chart.data = this.weatherForecast;

		// Create X and Y axes
		const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

		// Create a series for the humidity data
		const series = chart.series.push(new am4charts.LineSeries());
		series.dataFields.dateX = "date";
		series.dataFields.valueY = "humidity";
		// series.tooltipText = "{description} | RH- {valueY.value}%";

		valueAxis.cursorTooltipEnabled = false;
		dateAxis.cursorTooltipEnabled = false;

		// Configure the tooltip
		series.tooltipHTML = `
		<div style="color: white; display: inline;">
			<img
				src="https://openweathermap.org/img/wn/{icon}@2x.png"
				alt="weather Image"
				style="height: 40px; width: 45px; display: inline;"
			/>
			<h4 style="color: white;">Weather Forecast: {description}</h4>
			<p style="color: white;">Date: {dateX.formatDate("yyyy-MM-dd HH:mm")}</p>
			<p style="color: white;">Temperature: {temperature}°{receivedUnit}</p>
			<p style="color: white;">RH: {valueY.value}%</p>
			<p style="color: white;">Precipitation: {pop}%</p>
		</div>
	  `;

		// Customize axis and series appearance
		dateAxis.renderer.grid.template.strokeWidth = 0.1;
		dateAxis.renderer.grid.template.strokeOpacity = 0.3;
		valueAxis.renderer.grid.template.strokeWidth = 0.1;
		valueAxis.renderer.grid.template.strokeOpacity = 0.3;
		valueAxis.title.text = "RH (%)";
		series.tensionX = 0.8;
		series.tensionY = 0.8;
		series.strokeWidth = 3;

		// Add cursor, scrollbar, and customize scrollbar appearance
		chart.cursor = new am4charts.XYCursor();
		chart.cursor.xAxis = dateAxis;
		chart.scrollbarX = new am4core.Scrollbar();
		chart.scrollbarX.background.fill = am4core.color("#E6F5FE");
		chart.scrollbarX.thumb.background.fill = am4core.color("#0586DB");
		chart.scrollbarX.thumb.background.fillOpacity = 0.7;
		chart.scrollbarX.thumb.stroke = am4core.color("#02426D");
		chart.scrollbarX.thumb.strokeWidth = 1;
		chart.scrollbarX.startGrip.icon.disabled = true;
		chart.scrollbarX.endGrip.icon.disabled = true;

		// Create a label
		var label = chart.chartContainer.createChild(am4core.Label);
		label.text = "Weather Forecast"; // Set the label text
		label.fontSize = 12; // Set the font size
		label.align = "center"; // Align the label to the center
		label.valign = "bottom"; // Align the label to the bottom
		label.dy = 10; // Adjust vertical position as needed

		this.chart = chart;
	}

	// Initialize the temperature chart using amCharts
	initTempChart() {
		if (this.chart) {
			this.chart.dispose();
		}
		am4core.useTheme(am4themes_animated);

		// Create a chart instance
		const chart = am4core.create("chartdiv", am4charts.XYChart);

		chart.data = this.weatherForecast;

		// Create X and Y axes
		const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

		// Create a series for the temperature data
		const series = chart.series.push(new am4charts.LineSeries());
		series.dataFields.dateX = "date";
		series.dataFields.valueY = "temperature";
		// series.tooltipText =			"{description} | Temp - {valueY.value}°{receivedUnit}";

		// Customize axis and series appearance
		dateAxis.renderer.grid.template.strokeWidth = 0.1;
		dateAxis.renderer.grid.template.strokeOpacity = 0.3;
		valueAxis.renderer.grid.template.strokeWidth = 0.1;
		valueAxis.renderer.grid.template.strokeOpacity = 0.3;
		valueAxis.title.text = "Temperature (°" + this.receivedUnit + ")";
		series.tensionX = 0.8;
		series.tensionY = 0.8;
		series.strokeWidth = 3;

		valueAxis.cursorTooltipEnabled = false;
		dateAxis.cursorTooltipEnabled = false;

		// Configure the tooltip
		series.tooltipHTML = `
		<div style="color: white; display: inline;">
		<img
			src="https://openweathermap.org/img/wn/{icon}@2x.png"
			alt="weather Image"
			style="height: 40px; width: 45px; display: inline;"
		/>
		<h4 style="color: white;">Weather Forecast: {description}</h4>
		<p style="color: white;">Date: {dateX.formatDate("yyyy-MM-dd HH:mm")}</p>
		<p style="color: white;">Temperature: {temperature}°{receivedUnit}</p>
		<p style="color: white;">RH: {valueY.value}%</p>
		<p style="color: white;">Precipitation: {pop}%</p>
		</div>
	  `;

		// Add cursor, scrollbar, and customize scrollbar appearance
		chart.cursor = new am4charts.XYCursor();
		// chart.cursor.xAxis = dateAxis;
		chart.scrollbarX = new am4core.Scrollbar();
		chart.scrollbarX.background.fill = am4core.color("#E6F5FE");
		chart.scrollbarX.thumb.background.fill = am4core.color("#0586DB");
		chart.scrollbarX.thumb.background.fillOpacity = 0.7;
		chart.scrollbarX.thumb.stroke = am4core.color("#02426D");
		chart.scrollbarX.thumb.strokeWidth = 1;
		chart.scrollbarX.startGrip.icon.disabled = true;
		chart.scrollbarX.endGrip.icon.disabled = true;

		// Create a label
		var label = chart.chartContainer.createChild(am4core.Label);
		label.text = "Weather Forecast"; // Set the label text
		label.fontSize = 12; // Set the font size
		label.align = "center"; // Align the label to the center
		label.valign = "bottom"; // Align the label to the bottom
		label.dy = 10; // Adjust vertical position as needed

		this.chart = chart;
	}

	// Search for a location based on user input
	searchLocation() {
		this.shareLocation();
	}

	// Share the selected location with other components
	shareLocation(): void {
		this.sharedService.updateSharedData(this.locationValue);
	}

	// Angular lifecycle hook: Executes when the component is destroyed
	ngOnDestroy() {
		if (this.chart) {
			this.chart.dispose();
		}
	}
}
