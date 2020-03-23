import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  switchToFavoritesMenu:{
    favoritesMenu: boolean;
    index: number;
  };
  isFavoriteMenuEnabled(goToFavMenu: {
    favoritesMenu: boolean;
    index: number;
  }) {
    this.switchToFavoritesMenu = goToFavMenu;
    console.log(this.switchToFavoritesMenu);
  }
}
