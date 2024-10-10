import { User } from './user.model';

export class Profile {
  id!: string;
  username!: string;
  fullName!: string;
  coverImgUrl!: string;
  location!: string;
  status!: string;
  locationCoordinates!: LocationCoordinates;
  tags!: string[];
  isProfileCompleted!: boolean;
  following!: number;
  followers!: number;
  blooms!: number;
  notificationSettings!: NotificationSettings;
  createdAt!: Date;
  updatedAt!: Date;
  topics!: Topic[];
  gardeners!: Profile[];
  user!: User;
}

export class LocationCoordinates {
  type!: string;
  coordinates!: [number, number];
}

export class NotificationSettings {
  isNotification!: boolean;
  sound!: boolean;
  vibrate!: boolean;
  followRequest!: boolean;
  chat!: boolean;
  group!: boolean;
  bloom!: boolean;
  like!: boolean;
  wNotification!: boolean;
  temporaryPause!: boolean;
  newsLetter!: boolean;
  accountYouFollow!: boolean;
}

export class Topic {
  id!: string;
  name!: string;
  imgUrl!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
