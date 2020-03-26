import { Quality } from './quality';

export interface Channel {
  display_alias: string;
  sharing: boolean;
  is_radio: boolean;
  title: string;
  cid: string;
  group_index: number;
  recording: boolean;
  qualities: Quality[];
  highestQuality?: Quality;
  recommendations: boolean;
  id: string;
  visibleInView?: boolean;
  isFavorite?: boolean;
  scrollIntoView?: boolean;
}
