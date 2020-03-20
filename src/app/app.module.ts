import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ChannelsComponent } from './channels/components/channels/channels.component';
import {ChannelsService} from './channels/services/channels.service';
import {HttpClientModule} from '@angular/common/http';
import { ListItemWrapperComponent } from './list-item-wrapper/list-item-wrapper.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ClassDirective } from './channels/directives/class.directive';

@NgModule({
  declarations: [AppComponent, ListItemComponent, ChannelsComponent, ListItemWrapperComponent, FavoritesComponent, ClassDirective],
  imports: [BrowserModule, HttpClientModule],
  // TODO: move this into its own module ?
  providers: [ChannelsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
