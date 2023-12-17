import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private appKey: string = environment.api.weather.key;
  constructor(private httpClient: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.httpClient.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.appKey}&units=metric&mode=json`);
  }

}
