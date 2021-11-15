import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu-items',
  },
  {
    path: 'menu-items',
    component: MenuItemsComponent,
  },
  {
    path: 'menu-items/:id',
    component: MenuItemsComponent,
  },
  {
    path: 'cart-items',
    component: CartItemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
