import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';
  private openRouteServiceUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
  private apiKey = '5b3ce3597851110001cf62486fb5ca8330ac4fc9bf5bb442df9ae8b1';
  private httpClient: HttpClient;
  constructor(   
    private handler: HttpBackend,
    private http: HttpClient) {
      this.httpClient = new HttpClient(this.handler)
    }

  
  getLocation(address){
    return this.httpClient.get<any[]>(`${this.nominatimUrl}?q=${address}&format=json`);
  }

  getDistance(coordinates){
    return this.httpClient.post(`${this.openRouteServiceUrl}`, coordinates, {
      headers: { 'Authorization': this.apiKey }
    })
  }
}
