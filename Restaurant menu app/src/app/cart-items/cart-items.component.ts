import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  itemsAddedToCart: any[] = [];
  totalAmount = 0;
  successMessage: any = '';

  constructor(private _router: Router) {}

  ngOnInit() {
    let cartItems = sessionStorage.getItem('cart-items');
    this.itemsAddedToCart = JSON.parse('' + cartItems);

    this.itemsAddedToCart.forEach((items) => {
      this.totalAmount += Number(items.price * items.itemAddedToCart);
    });
  }

  navigateToMenu() {
    this._router.navigateByUrl('menu-items');
  }

  placeOrder() {
    this.successMessage = 'Your order has been placed successfully!';
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  }
}
