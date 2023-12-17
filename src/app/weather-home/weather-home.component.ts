import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { WeatherData } from '../_models/interfaces/weather.interface';
import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html'
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  initialCity: string = 'São Paulo';
  weatherData!: WeatherData;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather(this.initialCity);
  }
  getWeather(city: string) {
    this.weatherService.getWeather(city)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data && (this.weatherData = data);
        },
        error: (err) => { console.log(err); },
        complete: () => { console.log('Done'); }
      });
  }

  onSubmit(): void {
    this.getWeather(this.initialCity);
    this.initialCity = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
