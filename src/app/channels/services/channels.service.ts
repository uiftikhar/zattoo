import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, from, Observable, Subject} from 'rxjs';
import {
  concatMap,
  distinct,
  filter,
  map,
  mergeMap,
  reduce,
  retryWhen,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
import { Channel } from '../interfaces/channel';

@Injectable()
export class ChannelsService {
  private API_URL = '/assets';

  _favorites$: Observable<Channel[]>;
  private favoritesSubject$: BehaviorSubject<Channel[]> = new BehaviorSubject<
    Channel[]
  >(null);
  constructor(private readonly http: HttpClient) {}

  getAvailableHighestQualityChannels(): Observable<Channel[]> {
    return this.getHighestQualityChannels(`${this.API_URL}/channels.json`).pipe(
      map(this.isAvailable),
    );
  }

  getFavorites(): Observable<Channel[]> {
    return this.getHighestQualityChannels(
      `${this.API_URL}/favorites.json`,
    ).pipe(
      map(this.isAvailable),
      mergeMap(favorites => {
        this.favoritesSubject$.next(favorites);
        return this.favoritesSubject$.asObservable();
      }),
    );
  }

  private isAvailable(channels: Channel[]): Channel[] {
    return channels.filter(
      channel => channel.highestQuality.availability === 'available',
    );
  }

  private getHighestQualityChannels(url: string) {
    return this.getAllDistinctChannels(url).pipe(map(this.toHighestQuality));
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

  private getAllDistinctChannels(url: string): Observable<Channel[]> {
    return this.http.get(url).pipe(
      map(this.toResponse),
      concatMap(from),
      distinct(this.byId),
      reduce(this.toArray, []),
      shareReplay(1),
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

  toggleFavorite(channel: Channel, favorite: boolean) {
    if (favorite) {
      return this.addFavorite(channel);
    } else {
      return this.removeFavorite(channel.id);
    }
  }

  addFavorite(channel: Channel) {
    const currentValue = this.favoritesSubject$.getValue();
    // TODO: filter for duplicates
    // TODO: If it is a duplicate, remove it from the list
    return this.favoritesSubject$.next([...currentValue, channel]);
  }

  removeFavorite(id: string) {
    const currentValue = this.favoritesSubject$.getValue();
    const response = currentValue.filter(_channel => _channel.id !== id);
    return this.favoritesSubject$.next(response);
  }
}
