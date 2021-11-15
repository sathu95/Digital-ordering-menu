import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css'],
})
export class MenuItemsComponent implements OnInit {
  restaurant_details: any;
  selectedId: any = '';
  constructor(
    private _homeService: HomeService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.selectedId = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.selectedId) {
      this._homeService
        .getRestaurantMenuById(this.selectedId)
        .subscribe((response: any) => {
          if (response.status === true) {
            this.restaurant_details = response.restaurant_menu;
          } else {
            alert('Server Error occurred');
          }
        });
    } else {
      this._homeService.getRestaurantMenu().subscribe((response: any) => {
        if (response.status === true) {
          this.restaurant_details = response.restaurant_menu[0];
        } else {
          alert('Server Error occurred');
        }
      });
    }
  }

  addItem(itemDetails: any) {
    if (itemDetails.itemAddedToCart === undefined) {
      itemDetails.itemAddedToCart = 1;
    } else {
      itemDetails.itemAddedToCart += 1;
    }
  }

  removeItem(itemDetails: any) {
    if (itemDetails.itemAddedToCart === undefined) {
      itemDetails.itemAddedToCart = 0;
    } else {
      if (itemDetails.itemAddedToCart !== 0) {
        itemDetails.itemAddedToCart -= 1;
      } else {
        itemDetails.itemAddedToCart = 0;
      }
    }
  }

  reviewOrder(restaurant_details: any) {
    let itemsAddedToCart: any[] = [];
    sessionStorage.clear();

    this.restaurant_details.section.forEach((section: any) => {
      section.items.forEach((items: any) => {
        if (items.itemAddedToCart !== undefined && items.itemAddedToCart != 0) {
          itemsAddedToCart.push(items);
        }
      });
    });

    if (itemsAddedToCart.length > 0) {
      sessionStorage.setItem(
        'restaurant-name',
        this.restaurant_details.restaurantName
      );
      sessionStorage.setItem('cart-items', JSON.stringify(itemsAddedToCart));
      this._router.navigateByUrl('cart-items');
    } else {
      alert('Please add the items into the cart');
    }
  }
}
