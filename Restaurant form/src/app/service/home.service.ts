import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  addRestaurantData(formData: any) {
    console.log('formData: ', formData);
    const obj = {
      restaurantName: formData.restaurant_name,
      sections: formData.sections,
    };
    return this.http.post(environment.apiBaseUrl + '/add', obj);
  }
}
