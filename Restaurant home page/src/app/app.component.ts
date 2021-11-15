import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //@ViewChild('zipcode', { static: true }) zippostal: ElementRef;
  title = 'Home';
  zipValue: any;
  venueList : any;
  currentLat: any;
  currentLong: any;
  geolocationPosition: any;
  constructor(private _http: HttpClient) {
  }
  ngOnInit() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getValue(val:string){
    console.info(val);
    this.zipValue=val;
  }
  goZip(){

    //this.zipValue = this.zippostal.nativeElement.value;

    console.log(this.zipValue);
    this._http.get('https://api.foursquare.com/v2/venues/search?client_id=HB1CVTCHDXNIFD0NSZKTJNXJYKYBBP4B0HJEUDL0T2IKJZZO' +
      '&client_secret=QY1NOC4K0WJ5JRGLZW24CPGNJYO12C15NHRG001H3MHJSSA0&v=20200625&categoryId=4d4b7105d754a06374d81259&radius=1500&near=' + this.zipValue).
    subscribe((restaurants:any) => {
      console.log(restaurants)
      this.venueList = Object.keys(restaurants.response.venues).map(function (input) {
        const restaurant = restaurants.response.venues[input];
        console.log(restaurant.categories[0].shortName);
        return {name: restaurant.name,currentLat:restaurant.location.labeledLatLngs[0].lng,currentLong:restaurant.location.labeledLatLngs[0].lat, formattedAddress: restaurant.location.formattedAddress, category: restaurant.categories[0].shortName};
      })
    }, error => {});
  }
}
