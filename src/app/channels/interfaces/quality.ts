import {StreamTypeEnum} from '../enums/stream-type.enum';
import {AvailabilityEnum} from '../enums/availability.enum';

export interface Quality {
  logo_white_84: string;
  logo_black_42: string;
  logo_black_84: string;
  level: string;
  stream_types: StreamTypeEnum[];
  title: string;
  logo_white_42: string;
  availability: AvailabilityEnum;
  logo_token: string;
}
