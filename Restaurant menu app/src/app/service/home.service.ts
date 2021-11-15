import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getRestaurantMenu() {
    return this.http.get(environment.apiBaseUrl + '/menu-items/');
  }

  getRestaurantMenuById(id: string) {
    return this.http.get(environment.apiBaseUrl + `/menu-items/${id}`);
  }
}
