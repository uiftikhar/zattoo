import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import {concatMap, distinct, map, reduce, shareReplay, take} from 'rxjs/operators';
import { Channel } from '../interfaces/channel';

@Injectable()
export class ChannelsService {
  constructor(private readonly http: HttpClient) {}

  getAvailableHighestQualityChannels() {
    return this.getHighestQualityChannels().pipe(map(this.isAvailable));
  }

  private isAvailable(channels: Channel[]): Channel[] {
    return channels.filter(
      channel => channel.highestQuality.availability === 'available',
    );
  }

  private getHighestQualityChannels() {
    return this.getAllDistinctChannels().pipe(map(this.toHighestQuality));
  }

  private toHighestQuality(channels: Channel[]): Channel[] {
    const item_order = ['uhd', 'hd', 'sd'];
    channels.forEach(channel => {
      channel.highestQuality = channel.qualities.sort(
        (a, b) => item_order.indexOf(a.level) - item_order.indexOf(b.level),
      )[0];
    });
    return channels;
  }

  private getAllDistinctChannels(): Observable<Channel[]> {
    return this.http.get('/assets/channels.json').pipe(
      map(this.toResponse),
      concatMap(from),
      distinct(this.byId),
      reduce(this.toArray, []),
      shareReplay(1)
    );
  }

  private toResponse(response: { channels: Channel[] }): Channel[] {
    return response.channels;
  }

  private byId(channel: Channel): string {
    return channel.id;
  }

  private toArray(channels: Channel[], channel: Channel): Channel[] {
    return [...channels, channel];
  }
}
