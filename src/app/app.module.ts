import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ChannelsComponent } from './channels/components/channels/channels.component';
import { ChannelsService } from './channels/services/channels.service';
import { HttpClientModule } from '@angular/common/http';
import { FavoritesComponent } from './favorites/favorites.component';
import { KeyboardNavDirective } from './channels/directive/keyboard-nav.directive';
import { KeyboardNavItemDirective } from './channels/directive/keyboard-nav-item.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    ChannelsComponent,
    FavoritesComponent,
    KeyboardNavDirective,
    KeyboardNavItemDirective,
  ],
  imports: [BrowserModule, HttpClientModule],
  // TODO: move this into its own module ?
  providers: [ChannelsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
