import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListItemComponent } from './shared/list-item/list-item.component';
import { ChannelsComponent } from './channels/components/channels/channels.component';
import { ChannelsService } from './channels/services/channels.service';
import { HttpClientModule } from '@angular/common/http';
import { FavoritesComponent } from './channels/favorites/favorites.component';
import { KeyboardNavDirective } from './shared/directive/keyboard-nav.directive';
import { KeyboardNavItemDirective } from './shared/directive/keyboard-nav-item.directive';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    ChannelsComponent,
    FavoritesComponent,
    KeyboardNavDirective,
    KeyboardNavItemDirective,
  ],
  imports: [BrowserModule, HttpClientModule, VirtualScrollerModule],
  // TODO: move this into its own module ?
  providers: [ChannelsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
