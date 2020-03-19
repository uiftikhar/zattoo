import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { from, Observable, Subject } from 'rxjs';
import {
  concatMap,
  distinct,
  filter, flatMap,
  map,
  reduce,
  shareReplay,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Injectable()
export class ChannelsService {
  private readonly destroy$: Subject<boolean> = new Subject();

  constructor(private readonly http: HttpClient) {}

  getAllDistinctChannels(): Observable<any> {
    return this.http.get('/assets/channels.json').pipe(
      map(this.toResponse),
      concatMap(from),
      distinct(this.byId),
      reduce(this.toArray, []),
      shareReplay(1),
    );
  }

  getHighestQualityChannels() {
    return this.getAllDistinctChannels().pipe(map(this.toHighestQuality));
  }

  getAvailableHighestQualityChannels() {
    return this.getHighestQualityChannels().pipe(map(this.isAvailable));
  }

  isAvailable(channels) {
    return channels.filter(
      channel => channel.qualities.availability === 'available',
    );
  }

  toHighestQuality(channels) {
    const item_order = ['uhd', 'hd', 'sd'];

    channels.forEach(channel => {
      channel.qualities = channel.qualities.sort(
        (a, b) => item_order.indexOf(a.level) - item_order.indexOf(b.level),
      )[0];
    });
    return channels;
  }

  toResponse(response) {
    return response.channels;
  }

  byId(channel) {
    return channel.id;
  }

  toArray(channels, channel) {
    return [...channels, channel];
  }
}
